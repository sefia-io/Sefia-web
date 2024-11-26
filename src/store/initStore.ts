import { create } from "zustand";

type AdminInfo = {
  email: string;
  name: string;
  password: string;
};

type DomainInfo = {
  applicationDomain: string;
  servingDomain: string;
  webRoot: string;
};

type InitState = {
  currentPage: number;
  lastPage: number;
  adminInfo: AdminInfo;
  domainInfo: DomainInfo;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  setAdminInfo: (info: AdminInfo) => void;
  setDomainInfo: (info: DomainInfo) => void;
};

export const useInitStore = create<InitState>((set) => ({
  currentPage: 1,
  lastPage: 3,
  adminInfo: { email: "", name: "", password: "" },
  domainInfo: { applicationDomain: "", servingDomain: "", webRoot: "" },
  nextPage: () =>
    set((state) => ({
      currentPage: Math.min(state.currentPage + 1, state.lastPage),
    })),
  prevPage: () =>
    set((state) => ({
      currentPage: Math.max(state.currentPage - 1, 1),
    })),
  setPage: (page) =>
    set((state) => ({
      currentPage: Math.max(1, Math.min(page, state.lastPage)), // 페이지 범위 제한
    })),
  setAdminInfo: (info) =>
    set(() => ({
      adminInfo: info,
    })),
  setDomainInfo(info) {
    set(() => ({
      domainInfo: info,
    }));
  },
}));
