import { useQuery } from "@tanstack/react-query";
import { getInterviewCount } from "../../services/interviewService";
import { getTotalInterviewTime } from "../../services/interviewService";
import { getplandayleft } from "../../services/interviewService";

export function useInterviewCount() {
  return useQuery({
    queryKey: ["interview-count"],
    queryFn: getInterviewCount,
    staleTime: 1000 * 60 * 5,
  });
}

export function useInterviewTime() {
  return useQuery({
    queryKey: ["interview-total-time"],
    queryFn: getTotalInterviewTime,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}

export function useDaysremain(subscriptionEnd?: string) {
  const now = Date.now();

  const staleTime = subscriptionEnd
    ? Math.max(
        new Date(subscriptionEnd).getTime() - now,
        0
      )
    : 1000 * 60 * 10;

  return useQuery({
    queryKey: ["plan-days-remaining"],
    queryFn: getplandayleft,
    staleTime,
  });
}
