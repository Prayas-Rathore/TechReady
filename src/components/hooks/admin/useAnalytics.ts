import { useQuery } from "@tanstack/react-query";
import { 
  getTotalUsers,
  getNewUsersThisMonth,
  getTotalSession,
  getUserGrowthData,
getRevenueData,
getSessionsData,
getActivityData
} from "../../../services/admin/analyticsService";

export function useTotalUsers() {
  return useQuery({
    queryKey: ["total-users"],
    queryFn: getTotalUsers,
    staleTime: 1000 * 60 * 5,
  });
}

export function useNewUsersThisMonth() {
  return useQuery({
    queryKey: ["new-users-month"],
    queryFn: getNewUsersThisMonth,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetTotalSession() {
  return useQuery({
    queryKey: ["total-interview-sessions"],
    queryFn: getTotalSession,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUserGrowthData(days: number = 30) {
  return useQuery({
    queryKey: ["user-growth", days],
    queryFn: () => getUserGrowthData(days),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });
}

export function useRevenueData(days: number = 30) {
  return useQuery({
    queryKey: ["revenue-data", days],
    queryFn: () => getRevenueData(days),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}

export function useSessionsData(days: number = 7) {
  return useQuery({
    queryKey: ["sessions-data", days],
    queryFn: () => getSessionsData(days),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
  });
}

export function useActivityData(days: number = 7) {
  return useQuery({
    queryKey: ["activity-data", days],
    queryFn: () => getActivityData(days),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
  });
}