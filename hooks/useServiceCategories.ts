import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type ServiceCategory = {
  id: string; // Adjust type based on your Supabase schema
  name: string;
  description?: string; // Optional field
};

export const useServiceCategories = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_categories")
      .select("*");

    if (error) {
      console.error(error);
      setError("Failed to fetch service categories.");
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error };
};
