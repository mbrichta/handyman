// hooks/useSubServices.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type SubService = {
  id: string; // Adjust based on your schema
  name: string;
  description?: string;
  service_category_id: string;
};

export const useSubServicesCategories = (serviceCategoryId?: string) => {
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubServices = async () => {
    // If there's no selected category yet, skip fetching
    if (!serviceCategoryId) {
      setSubServices([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("subservice_categories")
      .select("*")
      .eq("service_category_id", serviceCategoryId);

    if (error) {
      console.error(error);
      setError("Failed to fetch sub-services.");
    } else {
      setSubServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubServices();
  }, [serviceCategoryId]);

  return { subServices, loading, error };
};
