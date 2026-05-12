import path from "path";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image,
} from "@react-pdf/renderer";
import type { CVData } from "@/lib/types";

// Load Be Vietnam Pro from local node_modules (served via file:// in Node)
// @react-pdf/renderer can read TTF/OTF from disk
const BVP_DIR = path.join(
  process.cwd(),
  "node_modules/@fontsource/be-vietnam-pro/files"
);

try {
  Font.register({
    family: "BeVietnamPro",
    fonts: [
      {
        src: `${BVP_DIR}/be-vietnam-pro-vietnamese-400-normal.woff`,
        fontWeight: 400,
      },
      {
        src: `${BVP_DIR}/be-vietnam-pro-vietnamese-600-normal.woff`,
        fontWeight: 600,
      },
      {
        src: `${BVP_DIR}/be-vietnam-pro-vietnamese-700-normal.woff`,
        fontWeight: 700,
      },
    ],
  });
} catch {
  // Fallback to Helvetica
}

type Palette = {
  primary: string;
  accent: string;
  text: string;
  muted: string;
  surface: string;
};

const PALETTES: Record<string, Palette> = {
  classic: { primary: "#003d9b", accent: "#1d4ed8", text: "#111827", muted: "#4b5563", surface: "#f3f4f6" },
  modern: { primary: "#0f172a", accent: "#0891b2", text: "#0f172a", muted: "#475569", surface: "#f1f5f9" },
  minimal: { primary: "#111111", accent: "#555555", text: "#111111", muted: "#666666", surface: "#f5f5f5" },
  creative: { primary: "#7c3aed", accent: "#ec4899", text: "#1f2937", muted: "#6b7280", surface: "#faf5ff" },
  executive: { primary: "#1f2937", accent: "#b45309", text: "#111827", muted: "#4b5563", surface: "#f9fafb" },
  milano: { primary: "#0e7490", accent: "#0891b2", text: "#0f172a", muted: "#475569", surface: "#ecfeff" },
  tokyo: { primary: "#db2777", accent: "#be185d", text: "#111827", muted: "#4b5563", surface: "#fdf2f8" },
  berlin: { primary: "#0f172a", accent: "#334155", text: "#0f172a", muted: "#475569", surface: "#f8fafc" },
  dubai: { primary: "#b45309", accent: "#d97706", text: "#111827", muted: "#4b5563", surface: "#fffbeb" },
  seoul: { primary: "#059669", accent: "#10b981", text: "#0f172a", muted: "#4b5563", surface: "#ecfdf5" },
};

function palette(id: string): Palette {
  return PALETTES[id] || PALETTES.classic;
}

function styles(p: Palette) {
  return StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      padding: 36,
      fontFamily: "BeVietnamPro",
      fontSize: 10,
      color: p.text,
      lineHeight: 1.5,
    },
    headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
    photo: { width: 72, height: 72, borderRadius: 36, marginRight: 14, objectFit: "cover" },
    headerText: { flexGrow: 1 },
    name: { fontSize: 22, fontWeight: 700, color: p.primary, marginBottom: 2 },
    title: { fontSize: 12, color: p.accent, fontWeight: 600, marginBottom: 6 },
    contactRow: { flexDirection: "row", flexWrap: "wrap", fontSize: 9, color: p.muted, gap: 8 },
    contact: { marginRight: 10 },
    rule: { height: 2, backgroundColor: p.primary, marginVertical: 10 },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: p.primary,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginTop: 10,
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: p.surface,
      paddingBottom: 3,
    },
    item: { marginBottom: 8 },
    itemHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
    itemTitle: { fontSize: 10.5, fontWeight: 700, color: p.text },
    itemSubtitle: { fontSize: 10, color: p.accent, fontWeight: 600 },
    itemDate: { fontSize: 9, color: p.muted },
    itemDesc: { fontSize: 9.5, color: p.muted, marginTop: 2 },
    summary: { fontSize: 10, color: p.muted, marginBottom: 4 },
    skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
    skillChip: {
      fontSize: 9,
      backgroundColor: p.surface,
      color: p.text,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
      marginRight: 4,
      marginBottom: 4,
    },
    watermark: {
      position: "absolute",
      top: "45%",
      left: 0,
      right: 0,
      textAlign: "center",
      transform: "rotate(-28deg)",
      fontSize: 52,
      fontWeight: 700,
      color: "rgba(0,61,155,0.08)",
    },
    footer: {
      position: "absolute",
      bottom: 16,
      left: 36,
      right: 36,
      fontSize: 8,
      color: p.muted,
      textAlign: "center",
    },
  });
}

function fmtRange(start?: string, end?: string, current?: boolean) {
  const s = (start || "").slice(0, 7);
  const e = current ? "Hiện tại" : (end || "").slice(0, 7);
  if (!s && !e) return "";
  return [s, e].filter(Boolean).join(" – ");
}

export function CVDocument({ cv, isPro }: { cv: CVData; isPro: boolean }) {
  const p = palette(cv.template_id || "classic");
  const s = styles(p);
  const pi = cv.personal_info || ({} as CVData["personal_info"]);

  return (
    <Document
      author={pi.full_name}
      title={cv.title || pi.full_name || "CV"}
      creator="YourCV"
      producer="YourCV"
    >
      <Page size="A4" style={s.page}>
        {!isPro && <Text fixed style={s.watermark}>YourCV</Text>}

        <View style={s.headerRow}>
          {pi.photo_url ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={pi.photo_url} style={s.photo} />
          ) : null}
          <View style={s.headerText}>
            <Text style={s.name}>{pi.full_name || ""}</Text>
            {pi.title ? <Text style={s.title}>{pi.title}</Text> : null}
            <View style={s.contactRow}>
              {pi.email ? <Text style={s.contact}>{pi.email}</Text> : null}
              {pi.phone ? <Text style={s.contact}>{pi.phone}</Text> : null}
              {pi.address ? <Text style={s.contact}>{pi.address}</Text> : null}
              {pi.website ? <Link src={pi.website} style={s.contact}>{pi.website}</Link> : null}
              {pi.linkedin ? <Link src={pi.linkedin} style={s.contact}>LinkedIn</Link> : null}
              {pi.github ? <Link src={pi.github} style={s.contact}>GitHub</Link> : null}
            </View>
          </View>
        </View>
        <View style={s.rule} />

        {pi.summary ? (
          <>
            <Text style={s.sectionTitle}>Giới thiệu</Text>
            <Text style={s.summary}>{pi.summary}</Text>
          </>
        ) : null}

        {cv.experiences?.length ? (
          <>
            <Text style={s.sectionTitle}>Kinh nghiệm</Text>
            {cv.experiences.map((x, i) => (
              <View key={i} style={s.item} wrap={false}>
                <View style={s.itemHeader}>
                  <Text style={s.itemTitle}>{x.position}</Text>
                  <Text style={s.itemDate}>{fmtRange(x.start_date, x.end_date, x.is_current)}</Text>
                </View>
                <Text style={s.itemSubtitle}>{[x.company, x.location].filter(Boolean).join(" • ")}</Text>
                {x.description ? <Text style={s.itemDesc}>{x.description}</Text> : null}
              </View>
            ))}
          </>
        ) : null}

        {cv.education?.length ? (
          <>
            <Text style={s.sectionTitle}>Học vấn</Text>
            {cv.education.map((x, i) => (
              <View key={i} style={s.item} wrap={false}>
                <View style={s.itemHeader}>
                  <Text style={s.itemTitle}>{x.school}</Text>
                  <Text style={s.itemDate}>{fmtRange(x.start_date, x.end_date)}</Text>
                </View>
                <Text style={s.itemSubtitle}>{[x.degree, x.field].filter(Boolean).join(" • ")}</Text>
                {x.gpa ? <Text style={s.itemDesc}>GPA: {x.gpa}</Text> : null}
                {x.description ? <Text style={s.itemDesc}>{x.description}</Text> : null}
              </View>
            ))}
          </>
        ) : null}

        {cv.projects?.length ? (
          <>
            <Text style={s.sectionTitle}>Dự án</Text>
            {cv.projects.map((x, i) => (
              <View key={i} style={s.item} wrap={false}>
                <View style={s.itemHeader}>
                  <Text style={s.itemTitle}>{x.name}</Text>
                  {x.url ? <Link src={x.url} style={s.itemDate}>{x.url}</Link> : null}
                </View>
                {x.technologies?.length ? (
                  <Text style={s.itemSubtitle}>{x.technologies.join(" • ")}</Text>
                ) : null}
                {x.description ? <Text style={s.itemDesc}>{x.description}</Text> : null}
              </View>
            ))}
          </>
        ) : null}

        {cv.certifications?.length ? (
          <>
            <Text style={s.sectionTitle}>Chứng chỉ</Text>
            {cv.certifications.map((x, i) => (
              <View key={i} style={s.item} wrap={false}>
                <View style={s.itemHeader}>
                  <Text style={s.itemTitle}>{x.name}</Text>
                  <Text style={s.itemDate}>{(x.date || "").slice(0, 7)}</Text>
                </View>
                <Text style={s.itemSubtitle}>{x.issuer}</Text>
                {x.url ? <Link src={x.url} style={s.itemDesc}>{x.url}</Link> : null}
              </View>
            ))}
          </>
        ) : null}

        {cv.skills?.length ? (
          <>
            <Text style={s.sectionTitle}>Kỹ năng</Text>
            <View style={s.skillsRow}>
              {cv.skills.map((x, i) => (
                <Text key={i} style={s.skillChip}>{x.name}</Text>
              ))}
            </View>
          </>
        ) : null}

        {cv.languages?.length ? (
          <>
            <Text style={s.sectionTitle}>Ngôn ngữ</Text>
            <View style={s.skillsRow}>
              {cv.languages.map((x, i) => (
                <Text key={i} style={s.skillChip}>{x.name} – {x.proficiency}</Text>
              ))}
            </View>
          </>
        ) : null}

        {!isPro ? (
          <Text fixed style={s.footer}>
            Tạo bởi YourCV • yourcv.net
          </Text>
        ) : null}
      </Page>
    </Document>
  );
}
