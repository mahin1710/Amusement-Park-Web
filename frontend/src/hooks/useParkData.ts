"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";

export function useParkData() {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [addons, setAddons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [attrRes, pkgRes] = await Promise.all([
          api.getAttractions().catch(() => null),
          api.getPackages().catch(() => null),
        ]);

        if (isMounted) {
          if (attrRes?.success) setAttractions(attrRes.data);
          if (pkgRes?.success) {
            setPackages(pkgRes.packages);
            setAddons(pkgRes.addons);
          }
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || "Failed to load park data");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { attractions, packages, addons, loading, error };
}

