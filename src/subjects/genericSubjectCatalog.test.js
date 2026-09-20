import {
  buildGenericSubjectStructure,
  normalizeGenericSection,
  normalizeGenericTopic,
} from "./genericSubjectCatalog";

describe("SPARK Generic Subject Catalog V2", () => {
  test("normalizes database section and topic rows", () => {
    expect(normalizeGenericSection({
      subject_id:"chemistry",
      section_id:"a",
      title:"Principles of Chemistry",
      sort_order:10,
    })).toMatchObject({
      id:"a",
      subjectId:"chemistry",
      title:"Principles of Chemistry",
      sortOrder:10,
    });

    expect(normalizeGenericTopic({
      subject_id:"chemistry",
      topic_id:"a1",
      section_id:"a",
      title:"States of matter",
    })).toMatchObject({
      id:"a1",
      sectionId:"a",
      title:"States of matter",
    });
  });

  test("builds a stable section and topic hierarchy", () => {
    const result = buildGenericSubjectStructure({
      sections:[
        {subject_id:"chemistry",section_id:"b",title:"Section B",sort_order:20,enabled:true},
        {subject_id:"chemistry",section_id:"a",title:"Section A",sort_order:10,enabled:true},
      ],
      topics:[
        {subject_id:"chemistry",topic_id:"b1",section_id:"b",title:"B topic",sort_order:10,enabled:true},
        {subject_id:"chemistry",topic_id:"a1",section_id:"a",title:"A topic",sort_order:10,enabled:true},
      ],
    });

    expect(result.sections.map(section => section.id)).toEqual(["a","b"]);
    expect(result.sections[0].topics.map(topic => topic.id)).toEqual(["a1"]);
    expect(result.topicCount).toBe(2);
  });

  test("keeps orphaned topics visible for content quality checks", () => {
    const result = buildGenericSubjectStructure({
      sections:[
        {subject_id:"chemistry",section_id:"a",title:"Section A",enabled:true},
      ],
      topics:[
        {subject_id:"chemistry",topic_id:"x1",section_id:"missing",title:"Needs section",enabled:true},
      ],
    });

    expect(result.unassignedTopics.map(topic => topic.id)).toEqual(["x1"]);
  });
});