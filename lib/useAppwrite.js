import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchFunction();
      setData(response);
    } catch (error) {
      Alert.alert("Error", `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useAppwrite;
