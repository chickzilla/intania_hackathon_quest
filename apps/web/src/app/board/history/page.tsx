"use client";
import { columns } from "@/components/history/column";
import { DataTable } from "@/components/history/data-table";
import { toast } from "@/components/ui/use-toast";
import { History, HistoryResponse } from "@/interface/history";
import GetHistories from "@/services/getHistories";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SelectPanel from "@/components/history/selectPanel";
import { useRouter } from "next/navigation";

export default function Page() {
  const [history, setHistory] = useState<History[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [countRecord, setCountRecord] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [chlidGetData, setChildGetData] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/auth/sign-in");
    } else {
      fetchHistory();
      setLoading(false);
      setIsAuthenticated(true);
    }
  }, []);

  const fetchHistory = async (pageOnclick?: number) => {
    try {
      const usedPage = pageOnclick ? pageOnclick : page;
      const res: HistoryResponse = await GetHistories({
        limit,
        offset: limit * (usedPage - 1),
        sortBy,
        orderBy: sortOrder,
      });
      if (res?.error) {
        toast({
          title: "Cannot get histories",
          description: res.error,
          isError: true,
        });
      }
      if (res?.data) {
        console.log(res.data);
        setHistory(res.data?.items);
        setTotalRecord(res.data?.metaData?.total);
        setCountRecord(res.data?.metaData?.count);
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Cannot get histories",
        description: "Failed to get histories",
        isError: true,
      });
    }

    setChildGetData(true);
  };

  useEffect(() => {
    fetchHistory();
    setLoading(false);
  }, []);

  const nextPage = () => {
    if (limit * page >= totalRecord) {
      return;
    }
    setChildGetData(false);
    fetchHistory(page + 1);
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page <= 1) {
      return;
    }
    setChildGetData(false);
    fetchHistory(page - 1);
    setPage(page - 1);
  };

  useEffect(() => {
    setChildGetData(false);
    fetchHistory(1);
    setPage(1);
  }, [sortBy, sortOrder]);

  if (isAuthenticated === null) return null;

  return (
    <main className="w-[100vw] px-10 lg:px-20 space-y-12 h-[100vh] overflow-y-hidden text-black bg-coffeeBlack overflow-x-hidden pb-20 py-[120px] pl-[140px] lg:pl-10">
      <div className="title-1 text-base md:text-2xl move-up w-[100%] lg:w-auto leading-snug text-start mb-3">
        Your History 👇
      </div>
      <div className="w-full flex flex-col">
        <div className="flex items-end justify-between space-x-6 py-4 w-full text-[#65767E]">
          <SelectPanel
            setSortByToParent={(sort: string) => {
              setSortBy(sort);
            }}
            setOrderByToParent={(order: string) => {
              setSortOrder(order);
            }}
          />
        </div>
        {!loading && (
          <>
            <div className="w-full flex flex-col items-start text-[#65767E]">
              <DataTable
                columns={columns}
                data={history}
                isGetData={chlidGetData}
              />
              <div className="flex items-center justify-start space-x-4">
                <span className="text-[#65767E] text-sm">
                  {limit * (page - 1) + countRecord} of {totalRecord} Records
                </span>
                <div className="flex items-center space-x-2">
                  <ChevronLeft
                    className={`hover:cursor-pointer ${
                      page <= 1
                        ? "text-transparent hover:cursor-default"
                        : "text-gray-400"
                    } text-xs`}
                    onClick={prevPage}
                  />
                  <span className="text-[#65767E] text-sm">{page}</span>
                  <ChevronRight
                    className={`hover:cursor-pointer ${
                      limit * page >= totalRecord
                        ? "text-transparent hover:cursor-default"
                        : "text-gray-400"
                    } text-xs`}
                    onClick={nextPage}
                  />
                </div>
              </div>
            </div>
            {/* Pagination Controls */}
          </>
        )}
      </div>
    </main>
  );
}
