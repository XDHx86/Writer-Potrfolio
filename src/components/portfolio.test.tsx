// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Work } from "./portfolio";

vi.mock("@plausible-analytics/tracker", () => ({ track: vi.fn() }));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", { writable: true, value: vi.fn().mockImplementation((query: string) => ({ matches: false, media: query, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() })) });
  class Observer { observe() {} unobserve() {} disconnect() {} }
  vi.stubGlobal("IntersectionObserver", Observer);
});

describe("work index", () => {
  it("filters manuscripts and exposes the supplied PDF archive", () => {
    render(<Work />);
    const section = screen.getByRole("region", { name: /Stories in the making/i });
    expect(section.querySelectorAll(".manuscript-row")).toHaveLength(5);
    expect(section.querySelectorAll(".archive-row")).toHaveLength(9);
    fireEvent.click(within(section).getByRole("button", { name: "Horror" }));
    expect(section.querySelectorAll(".manuscript-row")).toHaveLength(1);
    fireEvent.change(within(section).getByRole("searchbox", { name: "Search projects" }), { target: { value: "unrelated" } });
    expect(within(section).getByText(/No projects match your search/)).toBeVisible();
  });
});
