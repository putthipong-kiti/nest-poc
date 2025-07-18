// hooks/useUserData.js
import { useEffect, useState } from 'react';
import { ormApiClient, sequelizeApiClient } from '../api/clients';

export const useUserData = () => {
  // State for ORM data
  const [ormData, setOrmData] = useState([]);
  
  // State for Sequelize data
  const [sequelizeData, setSequelizeData] = useState({
    name: '',
    loading: true,
    error: null
  });

  // Function to fetch ORM data
  const fetchOrmData = async () => {
    try {
      setOrmData(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await ormApiClient.get('/users');
      
      if (response.data && response.data.length > 0) {
        setOrmData({
          name: response.data[0].name,
          loading: false,
          error: null
        });
      } else {
        setOrmData({
          name: '',
          loading: false,
          error: 'No users found'
        });
      }
    } catch (error) {
      // The interceptor has already logged the error
      setOrmData({
        name: '',
        loading: false,
        error: error.code === 'ECONNREFUSED' 
          ? 'TypeORM server is not available' 
          : 'Failed to fetch TypeORM data'
      });
    }
  };

  // Function to fetch Sequelize data
  const fetchSequelizeData = async () => {
    try {
      setSequelizeData(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await sequelizeApiClient.get('/users');
      
      if (response.data && response.data.length > 0) {
        setSequelizeData({
          name: response.data[0].name,
          loading: false,
          error: null
        });
      } else {
        setSequelizeData({
          name: '',
          loading: false,
          error: 'No users found'
        });
      }
    } catch (error) {
      setSequelizeData({
        name: '',
        loading: false,
        error: error.code === 'ECONNREFUSED' 
          ? 'Sequelize server is not available' 
          : 'Failed to fetch Sequelize data'
      });
    }
  };

  useEffect(() => {
    // Fetch data from both APIs when the hook is first used
    fetchOrmData();
    fetchSequelizeData();
  }, []);

  return {
    ormData,
    sequelizeData,
    refetchOrmData: fetchOrmData,
    refetchSequelizeData: fetchSequelizeData
  };
};
