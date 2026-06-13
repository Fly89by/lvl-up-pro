import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/supabase/client", () => {
  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null }),
    order: vi.fn().mockResolvedValue({ data: [] }),
    insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    update: vi.fn().mockResolvedValue({ data: null, error: null }),
  };
  return {
    createClient: () => ({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) },
      from: vi.fn(() => mockQuery),
    }),
  };
});

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/dashboard",
}));

describe("Login Page", () => {
  it("shows login form heading", async () => {
    const Page = (await import("@/app/[locale]/login/page")).default;
    render(<Page />);
    expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
  });
});

describe("Register Page", () => {
  it("shows register form heading", async () => {
    const Page = (await import("@/app/[locale]/register/page")).default;
    render(<Page />);
    expect(screen.getByRole("heading", { name: "Create Account" })).toBeInTheDocument();
  });
});

describe("Dashboard Pages render without crash", () => {
  it("overview", async () => {
    const Page = (await import("@/app/[locale]/dashboard/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });

  it("branches", async () => {
    const Page = (await import("@/app/[locale]/dashboard/branches/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });

  it("templates", async () => {
    const Page = (await import("@/app/[locale]/dashboard/templates/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });

  it("inspections", async () => {
    const Page = (await import("@/app/[locale]/dashboard/inspections/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });

  it("settings", async () => {
    const Page = (await import("@/app/[locale]/dashboard/settings/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });

  it("issues", async () => {
    const Page = (await import("@/app/[locale]/dashboard/issues/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });

  it("tasks", async () => {
    const Page = (await import("@/app/[locale]/dashboard/tasks/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });

  it("reports", async () => {
    const Page = (await import("@/app/[locale]/dashboard/reports/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });

  it("notifications", async () => {
    const Page = (await import("@/app/[locale]/dashboard/notifications/page")).default;
    expect(() => render(<Page />)).not.toThrow();
  });
});
