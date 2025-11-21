import { useQuery } from "@tanstack/react-query";
import { 
  getTotalUsers,
  getNewUsersThisMonth,
  getTotalSession
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

