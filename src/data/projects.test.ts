import { describe, expect, it } from "vitest";
import { filterProjects, projects } from "./projects";

describe("project discovery", () => {
  it("returns all resume-derived projects with no filters", () => {
    expect(filterProjects(projects, "All", "")).toHaveLength(5);
  });

  it("combines a category and a case-insensitive search", () => {
    expect(filterProjects(projects, "Worldbuilding", "MORAMANIA").map((project) => project.slug)).toEqual(["the-fate-of-moramania"]);
    expect(filterProjects(projects, "Fiction", "memory").map((project) => project.slug)).toEqual(["wild-horses"]);
  });

  it("matches themes and avoids unrelated results", () => {
    expect(filterProjects(projects, "All", "misinterpretation").map((project) => project.slug)).toEqual(["what-remains-of-us"]);
    expect(filterProjects(projects, "Horror", "fantasy")).toEqual([]);
  });
});
