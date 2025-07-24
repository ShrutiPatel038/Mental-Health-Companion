"use client"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProfile } from "@/lib/api";

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getProfile()
      .then(() => {
        if (isMounted) {
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
          navigate("/login");
        }
      });
    return () => { isMounted = false; };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your peaceful space...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
