// --- context/PortfolioBuilderContext.jsx ---
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-hot-toast';

const PortfolioBuilderContext = createContext();

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/portfolio`;
const GITHUB_API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/github`;

export const PortfolioBuilderProvider = ({ children }) => {
  const [portfolioData, setPortfolioDataInternal] = useState(null); 
  const [savedPortfolios, setSavedPortfolios] = useState([]);      
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token') || !!sessionStorage.getItem('token'));

  // Use a mutable ref to track active portfolio data so we can remove it from useCallback dependencies
  const portfolioDataRef = useRef(portfolioData);
  useEffect(() => {
    portfolioDataRef.current = portfolioData;
  }, [portfolioData]);

  // Clean, isolated header retrieval utility
  const getHeaders = useCallback(() => {
    const token = localStorage.getItem('token') || 
                  sessionStorage.getItem('token') || 
                  localStorage.getItem('user_token');
                  
    if (!token || token === 'null' || token === 'undefined') {
      console.error("[AUTH ERROR]: No authorization token found in web storage keys.");
      return null;
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.trim()}`
    };
  }, []);

  // Database hydration helper - safely decoupled from the portfolioData update loop
  const hydrateFromDatabase = useCallback(async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token || token === 'null' || token === 'undefined') {
      setIsLoading(false);
      setSavedPortfolios([]);
      return;
    }

    try {
      setIsLoading(true);
      const headers = getHeaders();
      if (!headers) return;

      const response = await fetch(API_BASE_URL, { headers });
      
      if (response.status === 404) {
        setSavedPortfolios([]);
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch user clusters');
      
      const dbData = await response.json();
      
      if (Array.isArray(dbData)) {
        setSavedPortfolios(dbData);
        // Safely check our mutable reference to bypass dependency updates
        if (dbData.length > 0 && !portfolioDataRef.current) {
          setPortfolioDataInternal(dbData[0]); 
        }
      } else if (dbData) {
        const normalizedItem = dbData.activeWorkspace || dbData;
        setPortfolioDataInternal(normalizedItem);
        setSavedPortfolios(dbData.allPortfolios || [normalizedItem]);
      }
    } catch (error) {
      console.error('[DATABASE CONNECT FAULT]:', error);
      setSavedPortfolios([]);
    } finally {
      setIsLoading(false);
    }
  }, [getHeaders]);

  // Synchronize state contexts strictly when authentication token states shift
  useEffect(() => {
    const hasToken = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
    setIsAuthenticated(hasToken);
    if (hasToken) {
      hydrateFromDatabase();
    } else {
      setSavedPortfolios([]);
      setPortfolioDataInternal(null);
    }
  }, [isAuthenticated, hydrateFromDatabase]);

  // Safe real-time memory state updater
  const updateActiveWorkspaceState = (updaterOrValue) => {
    setPortfolioDataInternal(prev => {
      const nextState = typeof updaterOrValue === 'function' 
        ? updaterOrValue(prev) 
        : updaterOrValue;
      return nextState;
    });
  };

  // Explicitly commits the workspace draft state to the backend
  // Explicitly commits the workspace draft state to the backend
  const savePortfolioDraft = async (explicitData = null) => {
    const stateToSave = explicitData || portfolioDataRef.current;

    if (!stateToSave) {
      toast.error('No configuration layout found to back up.');
      return false;
    }

    const headers = getHeaders();
    if (!headers || !headers.Authorization) {
      toast.error('Session validation missing. Redirecting to login...');
      window.location.href = '/login';
      return false;
    }

    try {
      // Create a clean copy of the data state structure to prevent Mongoose schema pollution
      const cleanPayload = { ...stateToSave };
      
      // Safety step: If _id is empty string "", change it to null so Mongoose treats it as a fresh record
      if (cleanPayload._id === "" || !cleanPayload._id) {
        delete cleanPayload._id;
      }

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(cleanPayload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Terminal validation expired. Please re-authenticate.');
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          window.location.href = '/login';
          return false;
        }
        throw new Error(`Backend refused structure sync. Status: ${response.status}`);
      }
      
      const committedInstance = await response.json();
      setPortfolioDataInternal(committedInstance);
      
      setSavedPortfolios(prev => {
        const index = prev.findIndex(p => p._id === committedInstance._id);
        if (index !== -1) {
          const updatedList = [...prev];
          updatedList[index] = committedInstance;
          return updatedList;
        }
        return [committedInstance, ...prev];
      });

      toast.success('Configuration state committed securely to account.');
      return true;
    } catch (error) {
      console.error('[DRAFT SAVE FAULT]:', error);
      toast.error('Failed to back up workspace changes.');
      return false;
    }
  };

  // Sync GitHub Engine
  const syncWithGitHubProfile = async (username) => {
    try {
      const headers = getHeaders();
      if (!headers) return null;

      const response = await fetch(`${GITHUB_API_URL}/sync?username=${username}`, { headers });

      if (!response.ok) throw new Error(`Sync error: ${response.status}`);

      const freshlySyncedPortfolio = await response.json();
      setPortfolioDataInternal(freshlySyncedPortfolio);
      
      if (freshlySyncedPortfolio?._id) {
        await hydrateFromDatabase();
      }
      
      return freshlySyncedPortfolio;
    } catch (error) {
      console.error('[GITHUB ARCHIVE SYNC FAULT]:', error);
      return null; 
    }
  };

  // Delete/De-provision architecture
  const removePortfolio = async (id) => {
    try {
      const targetId = id || portfolioDataRef.current?._id;
      if (!targetId) return false;

      const headers = getHeaders();
      if (!headers) return false;

      const response = await fetch(`${API_BASE_URL}/${targetId}`, {
        method: 'DELETE',
        headers: headers,
      });

      if (!response.ok) throw new Error('De-provisioning failed at backend level.');

      setSavedPortfolios(prev => prev.filter(p => p._id !== targetId));
      
      if (portfolioDataRef.current?._id === targetId) {
        setPortfolioDataInternal(null);
      }
      
      toast.success('Build configuration block destroyed.');
      return true;
    } catch (error) {
      console.error('[CLUSTER DESTRUCTION FAULT]:', error);
      toast.error('Could not completely destroy build node.');
      return false;
    }
  };

  return (
    <PortfolioBuilderContext.Provider 
      value={{ 
        portfolioData, 
        setPortfolioData: updateActiveWorkspaceState, 
        savePortfolioDraft,                           
        savedPortfolios,
        removePortfolio,
        syncWithGitHubProfile,
        refreshUserPortfolios: hydrateFromDatabase,
        isAuthenticated,
        setIsAuthenticated, 
        isLoading 
      }}
    >
      {children}
    </PortfolioBuilderContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioBuilderContext);