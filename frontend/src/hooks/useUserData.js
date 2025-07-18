import { useEffect, useState } from 'react';
import { ormApiClient, sequelizeApiClient, prismaApiClient } from '../core/interceptor';

export const useUserData = () => {
  const [ormData, setOrmData] = useState({
    name: '',
    loading: true,
    error: null
  });
  
  const [sequelizeData, setSequelizeData] = useState({
    name: '',
    loading: true,
    error: null
  });

  const [prismaData, setPrismaData] = useState({
    name: '',
    loading: true,
    error: null
  });

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
      setOrmData({
        name: '',
        loading: false,
        error: error.code === 'ECONNREFUSED' 
          ? 'TypeORM server is not available' 
          : 'Failed to fetch TypeORM data'
      });
    }
  };

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

  const fetchPrismaData = async () => {
    try {
      setPrismaData(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await prismaApiClient.get('/users');
      
      if (response.data && response.data.length > 0) {
        setPrismaData({
          name: response.data[0].name,
          loading: false,
          error: null
        });
      } else {
        setPrismaData({
          name: '',
          loading: false,
          error: 'No users found'
        });
      }
    } catch (error) {
      setPrismaData({
        name: '',
        loading: false,
        error: error.code === 'ECONNREFUSED' 
          ? 'Prisma server is not available' 
          : 'Failed to fetch Prisma data'
      });
    }
  };

  useEffect(() => {
    fetchOrmData();
    fetchSequelizeData();
    fetchPrismaData();
  }, []);

  return {
    ormData,
    sequelizeData,
    prismaData,
    refetchOrmData: fetchOrmData,
    refetchSequelizeData: fetchSequelizeData,
    refetchPrismaData: fetchPrismaData
  };
};
