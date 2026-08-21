/* @ds-bundle: {"format":4,"namespace":"MemortiumDesignSystem_1472ca","components":[{"name":"PortraitFigure","sourcePath":"components/brand/PortraitFigure.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"DataTable","sourcePath":"components/content/DataTable.jsx"},{"name":"FileRow","sourcePath":"components/content/FileRow.jsx"},{"name":"KeyValueList","sourcePath":"components/content/KeyValueList.jsx"},{"name":"PageHeader","sourcePath":"components/content/PageHeader.jsx"},{"name":"PriceCard","sourcePath":"components/content/PriceCard.jsx"},{"name":"Quote","sourcePath":"components/content/Quote.jsx"},{"name":"SectionHeader","sourcePath":"components/content/SectionHeader.jsx"},{"name":"SummaryRow","sourcePath":"components/content/SummaryRow.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"GlassCard","sourcePath":"components/core/GlassCard.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"DateField","sourcePath":"components/forms/DateField.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Fieldset","sourcePath":"components/forms/Fieldset.jsx"},{"name":"FileDrop","sourcePath":"components/forms/FileDrop.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"},{"name":"SelectField","sourcePath":"components/forms/SelectField.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextareaField","sourcePath":"components/forms/TextareaField.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"FloatingNav","sourcePath":"components/navigation/FloatingNav.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/PortraitFigure.jsx":"07aeb52b98db","components/brand/Wordmark.jsx":"4987c9648255","components/content/DataTable.jsx":"09d0f2340ac2","components/content/FileRow.jsx":"3834c7060f7c","components/content/KeyValueList.jsx":"2edffc2f9c57","components/content/PageHeader.jsx":"25c153bd6af0","components/content/PriceCard.jsx":"98a83957482c","components/content/Quote.jsx":"eaf3bb640cb2","components/content/SectionHeader.jsx":"6de41b4f5c1b","components/content/SummaryRow.jsx":"2a9e96cef205","components/core/Badge.jsx":"e4e5a04dcc01","components/core/Button.jsx":"358099e0be71","components/core/Card.jsx":"59fc74f9a3a0","components/core/GlassCard.jsx":"3f5fa770f90b","components/core/Icon.jsx":"8c31131d76ec","components/feedback/Dialog.jsx":"c9af6c163c14","components/feedback/EmptyState.jsx":"602045a16cca","components/feedback/Skeleton.jsx":"09b356da96d8","components/feedback/Toast.jsx":"d522ed2ed729","components/forms/Checkbox.jsx":"57b80de86c6d","components/forms/DateField.jsx":"c1ecf1494178","components/forms/Field.jsx":"050df42e0e99","components/forms/Fieldset.jsx":"560ba92e234b","components/forms/FileDrop.jsx":"8e2bd743aeae","components/forms/Radio.jsx":"86bde3943e88","components/forms/SearchField.jsx":"fc013c113987","components/forms/SelectField.jsx":"d0d7a29e85ca","components/forms/Switch.jsx":"f73b90e41fd7","components/forms/TextareaField.jsx":"af723706e4d2","components/navigation/Breadcrumb.jsx":"2794983c6388","components/navigation/FloatingNav.jsx":"2a12bc4feae0","components/navigation/Pagination.jsx":"954b85ddf08c","components/navigation/Sidebar.jsx":"9e1c035d0abb","components/navigation/SiteFooter.jsx":"74bc2559cd76","components/navigation/Tabs.jsx":"6663df3b41f5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MemortiumDesignSystem_1472ca = window.MemortiumDesignSystem_1472ca || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/PortraitFigure.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Bewerkt portret met het origineel als inzet rechtsonder. */
function PortraitFigure({
  edited,
  original,
  caption,
  originalOrientation = "portrait",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      fontFamily: "var(--font-family)",
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      aspectRatio: "3 / 4",
      background: "#e9eaef"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: edited,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), original ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 20,
      bottom: 20,
      width: "30%",
      aspectRatio: originalOrientation === "landscape" ? "4 / 3" : "3 / 4",
      borderRadius: "var(--radius-inset)",
      overflow: "hidden",
      boxShadow: "var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: original,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })) : null), caption ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--muted-foreground)"
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { PortraitFigure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PortraitFigure.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sources = {
  ink: "assets/memortium-woordmerk.svg",
  paper: "assets/memortium-woordmerk-wit.svg",
  currentColor: "assets/memortium-woordmerk-currentcolor.svg"
};

/** Het woordmerk als bestand. Minimaal 120 px breed op scherm. */
function Wordmark({
  variant = "ink",
  width = 148,
  base = "",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({
    src: base + sources[variant],
    alt: "Memortium",
    style: {
      width,
      height: "auto",
      display: "block",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/content/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tabel zonder zebrastrepen en zonder verticale lijnen. */
function DataTable({
  columns = [],
  rows = [],
  style,
  ...rest
}) {
  const grid = columns.map(c => c.width || "1fr").join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-family)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: grid,
      gap: "var(--space-3)",
      padding: "16px 32px",
      background: "var(--secondary)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.key,
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: "var(--muted-foreground)",
      textAlign: c.align || "left"
    }
  }, c.label))), rows.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: grid,
      gap: "var(--space-3)",
      padding: "18px 32px",
      borderTop: "1px solid var(--border)",
      alignItems: "baseline"
    }
  }, columns.map((c, j) => /*#__PURE__*/React.createElement("span", {
    key: c.key,
    style: {
      fontSize: "1rem",
      fontWeight: j === 0 ? "var(--weight-medium)" : "var(--weight-regular)",
      color: j === 1 ? "var(--muted-foreground)" : "var(--foreground)",
      textAlign: c.align || "left"
    }
  }, row[c.key])))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/content/KeyValueList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Regels label-waarde, voor de gegevens van een factuur of opdracht. */
function KeyValueList({
  items = [],
  columns = 1,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("dl", _extends({
    style: {
      margin: 0,
      fontFamily: "var(--font-family)",
      display: "grid",
      gridTemplateColumns: "repeat(" + columns + ", minmax(0, 1fr))",
      gap: "0 var(--space-5)",
      ...style
    }
  }, rest), items.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.label,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)",
      padding: "14px 0",
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)",
      flexShrink: 0
    }
  }, item.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontSize: "1rem",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)",
      textAlign: "right",
      minWidth: 0
    }
  }, item.value))));
}
Object.assign(__ds_scope, { KeyValueList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/KeyValueList.jsx", error: String((e && e.message) || e) }); }

// components/content/PageHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Paginakop van het portaal: micro-label, titel, en rechts de actie. Geen subtitel: dat is SectionHeader. */
function PageHeader({
  label,
  title,
  meta,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      fontFamily: "var(--font-family)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "var(--space-5)",
      flexWrap: "wrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      minWidth: 0
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: "var(--muted-foreground)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "var(--text-h2)",
      fontWeight: "var(--weight-bold)",
      lineHeight: "var(--leading-heading)",
      letterSpacing: "var(--tracking-h2)",
      color: "var(--foreground)"
    }
  }, title), meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, meta) : null), action ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexShrink: 0
    }
  }, action) : null);
}
Object.assign(__ds_scope, { PageHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PageHeader.jsx", error: String((e && e.message) || e) }); }

// components/content/PriceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pakketblok. Het aanbevolen pakket krijgt het donkere vlak, geen kleur en geen lint. */
function PriceCard({
  name,
  price,
  unit = "per portret",
  description,
  badge,
  action = "Kiezen",
  recommended = false,
  onChoose,
  style,
  ...rest
}) {
  const ink = recommended ? "#fcfcfd" : "var(--foreground)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-family)",
      background: recommended ? "var(--primary)" : "var(--secondary)",
      borderRadius: "var(--radius)",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      boxSizing: "border-box",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: recommended ? "#f0f1f4" : "var(--muted-foreground)",
      opacity: recommended ? 0.6 : 1
    }
  }, name), badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: "var(--primary)",
      background: "var(--secondary)",
      borderRadius: "var(--radius-pill)",
      padding: "7px 14px"
    }
  }, badge) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "3rem",
      fontWeight: "var(--weight-bold)",
      lineHeight: 1,
      letterSpacing: "var(--tracking-display)",
      color: ink,
      whiteSpace: "nowrap"
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem",
      color: recommended ? "#f0f1f4" : "var(--muted-foreground)",
      opacity: recommended ? 0.7 : 1,
      whiteSpace: "nowrap"
    }
  }, unit)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "1rem",
      lineHeight: "var(--leading-body)",
      color: ink,
      opacity: recommended ? 0.85 : 1,
      maxWidth: "34ch"
    }
  }, description), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onChoose,
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "1rem",
      fontWeight: "var(--weight-bold)",
      color: recommended ? "var(--foreground)" : "var(--foreground)",
      background: recommended ? "#fcfcfd" : "transparent",
      border: recommended ? "none" : "1px solid var(--primary)",
      borderRadius: "26px",
      height: "var(--control-height)",
      padding: "0 var(--control-padding-x)",
      cursor: "pointer",
      marginTop: "auto",
      alignSelf: "flex-start"
    }
  }, action));
}
Object.assign(__ds_scope, { PriceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PriceCard.jsx", error: String((e && e.message) || e) }); }

// components/content/Quote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Citaat in 300 op grote maat. Geen aanhalingstekens als ornament. */
function Quote({
  children,
  author,
  place,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("blockquote", _extends({
    style: {
      fontFamily: "var(--font-family)",
      margin: 0,
      background: "var(--secondary)",
      borderRadius: "var(--radius)",
      padding: "48px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "1.75rem",
      fontWeight: "var(--weight-light)",
      lineHeight: 1.45,
      color: "var(--foreground)",
      maxWidth: "32ch"
    }
  }, children), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, author ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-bold)",
      color: "var(--foreground)"
    }
  }, author) : null, place ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)"
    }
  }, place) : null));
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Quote.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Micro-label, titel, subtitel. De vaste opening van elke sectie. */
function SectionHeader({
  label,
  title,
  subtitle,
  size = "h2",
  inverse = false,
  style,
  ...rest
}) {
  const sizes = {
    h1: {
      fontSize: "var(--text-h1)",
      letterSpacing: "var(--tracking-h1)"
    },
    h2: {
      fontSize: "var(--text-h2)",
      letterSpacing: "var(--tracking-h2)"
    },
    display: {
      fontSize: "var(--text-display)",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)"
    }
  };
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      fontFamily: "var(--font-family)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: inverse ? "#f0f1f4" : "var(--muted-foreground)",
      opacity: inverse ? 0.6 : 1
    }
  }, label) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontWeight: "var(--weight-bold)",
      lineHeight: "var(--leading-heading)",
      color: inverse ? "var(--primary-foreground)" : "var(--foreground)",
      maxWidth: "var(--measure-title)",
      ...sizes[size]
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-lead)",
      fontWeight: "var(--weight-light)",
      lineHeight: "var(--leading-lead)",
      color: inverse ? "#f0f1f4" : "var(--muted-foreground)",
      opacity: inverse ? 0.8 : 1,
      maxWidth: "var(--measure-lead)"
    }
  }, subtitle) : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/content/SummaryRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Optelblok: subtotalen in gewicht 400, het totaal met een dikkere lijn erboven en gewicht 700. */
function SummaryRow({
  items = [],
  total,
  totalLabel = "Totaal",
  note,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-family)",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, rest), items.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.label,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)",
      padding: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem",
      color: "var(--muted-foreground)"
    }
  }, item.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem",
      color: "var(--foreground)",
      whiteSpace: "nowrap"
    }
  }, item.value))), total != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)",
      padding: "18px 0 0",
      borderTop: "1px solid var(--primary)",
      marginTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.25rem",
      fontWeight: "var(--weight-bold)",
      color: "var(--foreground)"
    }
  }, totalLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.5rem",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "-0.01em",
      color: "var(--foreground)",
      whiteSpace: "nowrap"
    }
  }, total)) : null, note ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)",
      lineHeight: 1.6
    }
  }, note) : null);
}
Object.assign(__ds_scope, { SummaryRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SummaryRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Micro-label in een pil. Drie tonen: licht vlak, donker vlak, alleen rand. */
function Badge({
  tone = "muted",
  style,
  children,
  ...rest
}) {
  const tones = {
    muted: {
      color: "var(--muted-foreground)",
      background: "var(--secondary)",
      border: "1px solid transparent",
      padding: "9px 16px"
    },
    solid: {
      color: "var(--cta-foreground)",
      background: "var(--primary)",
      border: "1px solid transparent",
      padding: "9px 16px"
    },
    outline: {
      color: "var(--muted-foreground)",
      background: "transparent",
      border: "1px solid var(--border-strong)",
      padding: "8px 15px"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      borderRadius: "var(--radius-pill)",
      display: "inline-block",
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: "var(--font-family)",
  borderRadius: "var(--radius-pill)",
  cursor: "pointer",
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all var(--duration-cta) var(--ease-premium)"
};
const variants = {
  primary: {
    fontSize: "0.9375rem",
    fontWeight: "var(--weight-medium)",
    color: "var(--cta-foreground)",
    background: "var(--cta)",
    border: "none",
    height: "var(--control-height)",
    padding: "0 var(--control-padding-x)",
    boxShadow: "var(--shadow-cta)"
  },
  action: {
    fontSize: "11px",
    fontWeight: "var(--weight-bold)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-micro)",
    color: "var(--cta-foreground)",
    background: "var(--cta)",
    border: "none",
    height: "var(--control-height-lg)",
    padding: "0 44px",
    boxShadow: "var(--shadow-cta)"
  },
  secondary: {
    fontSize: "0.9375rem",
    fontWeight: "var(--weight-medium)",
    color: "var(--foreground)",
    background: "transparent",
    border: "1px solid var(--border-strong)",
    height: "var(--control-height)",
    padding: "0 var(--control-padding-x)"
  },
  text: {
    fontSize: "1rem",
    fontWeight: "var(--weight-medium)",
    color: "var(--muted-foreground)",
    background: "transparent",
    border: "none",
    height: "var(--control-height)",
    padding: "0 8px",
    textDecoration: "underline",
    textUnderlineOffset: "5px"
  }
};

/** Alle knoppen zijn pillen. De primaire knop is #1a1a1e, ook binnen Levenslied. */
function Button({
  variant = "primary",
  disabled = false,
  href,
  onClick,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lift = variant === "primary" || variant === "action";
  const s = {
    ...base,
    ...variants[variant],
    ...(hover && !disabled && lift ? {
      opacity: 0.9,
      transform: "var(--lift-hover)"
    } : null),
    ...(hover && !disabled && variant === "secondary" ? {
      background: "rgba(45,45,58,0.05)",
      borderColor: "rgba(45,45,58,0.3)"
    } : null),
    ...(hover && !disabled && variant === "text" ? {
      color: "var(--foreground)"
    } : null),
    ...(disabled ? {
      background: "var(--secondary)",
      color: "var(--muted-foreground)",
      boxShadow: "none",
      opacity: 0.5,
      cursor: "not-allowed"
    } : null),
    ...style
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: {
        ...s,
        textDecoration: variant === "text" ? "underline" : "none"
      }
    }, handlers, rest), children);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    style: s
  }, handlers, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Vlakke kaart van #f0f1f4. Werkt op web en in druk. */
function Card({
  radius = "var(--radius)",
  padding = "40px",
  inverse = false,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-family)",
      background: inverse ? "var(--primary)" : "var(--secondary)",
      color: inverse ? "var(--primary-foreground)" : "var(--foreground)",
      borderRadius: radius,
      padding,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      boxSizing: "border-box",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const blur = {
  subtle: "var(--blur-subtle)",
  standard: "var(--blur-standard)",
  intense: "var(--blur-intense)"
};

/** Glaskaart. Uitsluitend boven beeld of textuur, nooit boven een egaal vlak. */
function GlassCard({
  intensity = "standard",
  radius = "var(--radius-lg)",
  padding = "24px 28px",
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-family)",
      background: "var(--glass-bg)",
      backdropFilter: blur[intensity],
      WebkitBackdropFilter: blur[intensity],
      border: "1px solid var(--glass-border)",
      borderRadius: radius,
      padding,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      boxSizing: "border-box",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * De vaste Lucide-set, met de geometrie inline zodat een icoon meteen staat
 * en geen netwerk nodig heeft. Elke vorm is ["tag", attributen], letterlijk
 * uit lucide-static 0.475.0. Voeg een naam alleen toe met de echte Lucide-data.
 */
const GLYPHS = {
  download: [["path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }], ["polyline", {
    points: "7 10 12 15 17 10"
  }], ["line", {
    x1: 12,
    x2: 12,
    y1: 15,
    y2: 3
  }]],
  upload: [["path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }], ["polyline", {
    points: "17 8 12 3 7 8"
  }], ["line", {
    x1: 12,
    x2: 12,
    y1: 3,
    y2: 15
  }]],
  "file-text": [["path", {
    d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
  }], ["path", {
    d: "M14 2v4a2 2 0 0 0 2 2h4"
  }], ["path", {
    d: "M10 9H8"
  }], ["path", {
    d: "M16 13H8"
  }], ["path", {
    d: "M16 17H8"
  }]],
  search: [["circle", {
    cx: 11,
    cy: 11,
    r: 8
  }], ["path", {
    d: "m21 21-4.3-4.3"
  }]],
  calendar: [["path", {
    d: "M8 2v4"
  }], ["path", {
    d: "M16 2v4"
  }], ["rect", {
    width: 18,
    height: 18,
    x: 3,
    y: 4,
    rx: 2
  }], ["path", {
    d: "M3 10h18"
  }]],
  "arrow-left": [["path", {
    d: "m12 19-7-7 7-7"
  }], ["path", {
    d: "M19 12H5"
  }]],
  "arrow-right": [["path", {
    d: "M5 12h14"
  }], ["path", {
    d: "m12 5 7 7-7 7"
  }]],
  "chevron-right": [["path", {
    d: "m9 18 6-6-6-6"
  }]],
  "chevron-down": [["path", {
    d: "m6 9 6 6 6-6"
  }]],
  check: [["path", {
    d: "M20 6 9 17l-5-5"
  }]],
  x: [["path", {
    d: "M18 6 6 18"
  }], ["path", {
    d: "m6 6 12 12"
  }]],
  phone: [["path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  }]],
  mail: [["rect", {
    width: 20,
    height: 16,
    x: 2,
    y: 4,
    rx: 2
  }], ["path", {
    d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
  }]],
  printer: [["path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }], ["path", {
    d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"
  }], ["rect", {
    width: 12,
    height: 8,
    x: 6,
    y: 14,
    rx: 1
  }]]
};

/** Namen die het systeem kent. Alleen deze, en alleen als een woord het niet redt. */
const ICON_NAMES = Object.keys(GLYPHS);

/**
 * Lucide-icoon op streekdikte 1,5, in de tekstkleur via currentColor.
 * Geen netwerk: de geometrie staat in dit bestand.
 */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  label,
  style,
  ...rest
}) {
  const vormen = GLYPHS[name];
  if (!vormen) {
    if (typeof console !== "undefined") console.warn("Icon: onbekende naam \"" + name + "\". Bekend: " + ICON_NAMES.join(", "));
    return null;
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: label ? "img" : "presentation",
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    style: {
      display: "block",
      flexShrink: 0,
      ...style
    }
  }, rest), vormen.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/FileRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Regel met een bestand en een downloadactie. Het formaat staat achter de naam, niet eronder. */
function FileRow({
  name,
  meta,
  icon = "file-text",
  action = "Download",
  onAction,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-family)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "16px 22px",
      boxSizing: "border-box",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      background: "var(--background)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted-foreground)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, name), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)"
    }
  }, meta) : null)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      flexShrink: 0,
      color: "var(--foreground)",
      background: hover ? "rgba(45,45,58,.05)" : "transparent",
      border: "1px solid " + (hover ? "rgba(45,45,58,.3)" : "var(--border-strong)"),
      borderRadius: "var(--radius-pill)",
      height: 44,
      padding: "0 22px",
      cursor: "pointer",
      transition: "all var(--duration-ui) ease"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "download",
    size: 17
  }), action));
}
Object.assign(__ds_scope, { FileRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FileRow.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Venster voor een bevestiging. Papierkleur op een donkere sluier, nooit glas: er zit geen beeld achter. */
function Dialog({
  open = true,
  label,
  title,
  description,
  actions,
  onClose,
  width = 460,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(26,26,30,.42)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    onClick: e => e.stopPropagation(),
    style: {
      fontFamily: "var(--font-family)",
      position: "relative",
      background: "var(--background)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-nav)",
      padding: "var(--space-5)",
      width,
      maxWidth: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Sluiten",
    style: {
      position: "absolute",
      top: 20,
      right: 20,
      display: "flex",
      background: "none",
      border: "none",
      padding: 4,
      cursor: "pointer",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 19
  })) : null, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: "var(--muted-foreground)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: "var(--text-h3)",
      fontWeight: "var(--weight-bold)",
      lineHeight: "var(--leading-snug)",
      letterSpacing: "-0.01em",
      paddingRight: onClose ? 32 : 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "1rem",
      lineHeight: "var(--leading-body)",
      color: "var(--foreground)"
    }
  }, description) : null, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      marginTop: "var(--space-2)",
      flexWrap: "wrap"
    }
  }, actions) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Leeg vlak. Zegt wat er nog niet is en wat de lezer kan doen, zonder illustratie en zonder spijt. */
function EmptyState({
  label,
  title,
  description,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: "var(--font-family)",
      background: "var(--secondary)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-6) var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      alignItems: "flex-start",
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: "var(--muted-foreground)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: "var(--text-h3)",
      fontWeight: "var(--weight-bold)",
      lineHeight: "var(--leading-snug)",
      letterSpacing: "-0.01em",
      color: "var(--foreground)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "1rem",
      lineHeight: "var(--leading-body)",
      color: "var(--foreground)",
      maxWidth: "44ch"
    }
  }, description) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, action) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Laadvlak. Een vlak in --secondary dat heel langzaam ademt, geen glans die eroverheen schuift. */
function Skeleton({
  width = "100%",
  height = 20,
  radius = "var(--radius-pill)",
  lines = 1,
  style,
  ...rest
}) {
  const vlak = extra => /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: extra || width,
      height,
      borderRadius: radius,
      background: "var(--secondary)",
      animation: "memortium-adem 1600ms var(--ease-premium) infinite",
      ...style
    }
  });
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, "@keyframes memortium-adem{0%,100%{opacity:1}50%{opacity:.55}}"), Array.from({
    length: lines
  }, (_, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, vlak(i === lines - 1 && lines > 1 ? "62%" : null))));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Korte bevestiging na een actie. Donker vlak, papierkleur tekst, verdwijnt van zelf. */
function Toast({
  open = true,
  children,
  action,
  onClose,
  position = "bottom",
  style,
  ...rest
}) {
  if (!open) return null;
  const plaats = position === "bottom" ? {
    bottom: "var(--space-5)",
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    top: "var(--space-5)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      position: "fixed",
      zIndex: 110,
      ...plaats,
      fontFamily: "var(--font-family)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      background: "var(--primary)",
      color: "#fcfcfd",
      borderRadius: "var(--radius-pill)",
      boxShadow: "var(--shadow-nav)",
      padding: "14px 14px 14px 24px",
      maxWidth: "min(560px, calc(100vw - 32px))",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      lineHeight: 1.5
    }
  }, children), action ? /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0
    }
  }, action) : null, onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Sluiten",
    style: {
      display: "flex",
      background: "none",
      border: "none",
      padding: 4,
      cursor: "pointer",
      color: "#f0f1f4",
      opacity: 0.7,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 17
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Aankruisvak met label ernaast. Het vakje is afgerond, niet rond: rond is de radio. */
function Checkbox({
  label,
  hint,
  checked = false,
  disabled,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-start",
      fontFamily: "var(--font-family)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      flexShrink: 0,
      marginTop: 1,
      boxSizing: "border-box",
      borderRadius: "7px",
      border: checked ? "1px solid var(--primary)" : "1px solid var(--border-strong)",
      background: checked ? "var(--primary)" : "var(--background)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all var(--duration-ui) ease"
    }
  }, checked ? /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--primary-foreground)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)",
      lineHeight: 1.5
    }
  }, label), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)",
      lineHeight: 1.55
    }
  }, hint) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/DateField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Datumveld. Zelfde pil als Field; de datumkiezer is die van de browser. */
function DateField({
  label,
  hint,
  value,
  min,
  max,
  onChange,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      fontFamily: "var(--font-family)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: "date",
    value: value,
    min: min,
    max: max,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "1rem",
      fontWeight: "var(--weight-regular)",
      color: "var(--foreground)",
      background: "var(--background)",
      border: "1px solid " + (focus ? "var(--primary)" : "var(--border-strong)"),
      borderRadius: "26px",
      height: "var(--control-height)",
      padding: "0 22px",
      boxSizing: "border-box",
      width: "100%",
      outline: "none"
    }
  }, rest)), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { DateField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DateField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tekstveld met label erboven. Het label staat nooit als placeholder. */
function Field({
  label,
  hint,
  placeholder,
  value,
  onChange,
  type = "text",
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      fontFamily: "var(--font-family)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "1rem",
      fontWeight: "var(--weight-regular)",
      color: "var(--foreground)",
      background: "var(--background)",
      border: "1px solid var(--border-strong)",
      boxSizing: "border-box",
      outline: "none",
      width: "100%",
      borderColor: focus ? "var(--primary)" : "var(--border-strong)",
      borderRadius: "26px",
      height: "var(--control-height)",
      padding: "0 22px"
    }
  }, rest)), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Fieldset.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Groep velden onder een eigen kop. De kop is een micro-label, geen tweede titel. */
function Fieldset({
  legend,
  hint,
  columns = 1,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("fieldset", _extends({
    style: {
      border: "none",
      margin: 0,
      padding: 0,
      fontFamily: "var(--font-family)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("legend", {
    style: {
      padding: 0,
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: "var(--muted-foreground)"
    }
  }, legend), hint ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)",
      lineHeight: 1.6,
      maxWidth: "54ch"
    }
  }, hint) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(" + columns + ", minmax(0, 1fr))",
      gap: "var(--space-4)"
    }
  }, children));
}
Object.assign(__ds_scope, { Fieldset });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Fieldset.jsx", error: String((e && e.message) || e) }); }

// components/forms/FileDrop.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Sleepvlak voor een bestand. Streepjesrand, nooit een gevuld vlak. */
function FileDrop({
  label = "Foto",
  description,
  action = "Bestand kiezen",
  filename,
  onChoose,
  style,
  ...rest
}) {
  const [over, setOver] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onDragOver: e => {
      e.preventDefault();
      setOver(true);
    },
    onDragLeave: () => setOver(false),
    onDrop: e => {
      e.preventDefault();
      setOver(false);
    },
    style: {
      fontFamily: "var(--font-family)",
      border: "1px dashed " + (over ? "var(--primary)" : "var(--border-strong)"),
      background: over ? "var(--secondary)" : "transparent",
      borderRadius: "var(--radius)",
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      alignItems: "flex-start",
      transition: "all var(--duration-ui) ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: "var(--muted-foreground)"
    }
  }, label), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "1rem",
      lineHeight: "var(--leading-body)",
      maxWidth: "44ch"
    }
  }, description) : null, filename ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)"
    }
  }, filename) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onChoose,
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)",
      background: "transparent",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-pill)",
      height: 48,
      padding: "0 26px",
      marginTop: "var(--space-2)",
      cursor: "pointer"
    }
  }, action));
}
Object.assign(__ds_scope, { FileDrop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FileDrop.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Rondje met label. Alleen voor twee tot vier keuzes waarvan er precies een geldt. */
function Radio({
  label,
  hint,
  value,
  checked = false,
  name,
  disabled,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-start",
      fontFamily: "var(--font-family)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      flexShrink: 0,
      marginTop: 1,
      boxSizing: "border-box",
      borderRadius: "var(--radius-pill)",
      border: checked ? "1px solid var(--primary)" : "1px solid var(--border-strong)",
      background: "var(--background)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all var(--duration-ui) ease"
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "var(--radius-pill)",
      background: "var(--primary)"
    }
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)",
      lineHeight: 1.5
    }
  }, label), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)",
      lineHeight: 1.55
    }
  }, hint) : null));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Zoekveld: pil met een loep links. Het enige veld zonder label erboven. */
function SearchField({
  placeholder = "Zoeken",
  value,
  onChange,
  onClear,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "var(--background)",
      border: "1px solid " + (focus ? "var(--primary)" : "var(--border-strong)"),
      borderRadius: "var(--radius-pill)",
      height: "var(--control-height)",
      padding: "0 20px",
      boxSizing: "border-box",
      transition: "border-color var(--duration-ui) ease",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted-foreground)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 18
  })), /*#__PURE__*/React.createElement("input", _extends({
    type: "search",
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "1rem",
      color: "var(--foreground)",
      background: "transparent",
      border: "none",
      outline: "none",
      flex: 1,
      minWidth: 0
    }
  }, rest)), value ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClear,
    "aria-label": "Wissen",
    style: {
      display: "flex",
      alignItems: "center",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 17
  })) : null);
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SelectField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Keuzelijst met label erboven. Zelfde maatvoering als Field. */
function SelectField({
  label,
  hint,
  value,
  onChange,
  options = [],
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      fontFamily: "var(--font-family)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)"
    }
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "1rem",
      fontWeight: "var(--weight-regular)",
      color: "var(--foreground)",
      background: "var(--background)",
      border: "1px solid var(--border-strong)",
      boxSizing: "border-box",
      outline: "none",
      width: "100%",
      borderColor: focus ? "var(--primary)" : "var(--border-strong)",
      borderRadius: "26px",
      height: "var(--control-height)",
      padding: "0 22px",
      appearance: "none"
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { SelectField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SelectField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Aan-uitschakelaar voor een instelling die meteen geldt, zonder opslaan. */
function Switch({
  label,
  hint,
  checked = false,
  disabled,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: "16px",
      alignItems: "flex-start",
      justifyContent: "space-between",
      fontFamily: "var(--font-family)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)",
      lineHeight: 1.5
    }
  }, label), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)",
      lineHeight: 1.55
    }
  }, hint) : null), /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 46,
      height: 28,
      flexShrink: 0,
      boxSizing: "border-box",
      padding: 3,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--primary)" : "var(--switch-background)",
      display: "flex",
      alignItems: "center",
      justifyContent: checked ? "flex-end" : "flex-start",
      transition: "background var(--duration-ui) ease"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "var(--radius-pill)",
      background: "var(--background)",
      boxShadow: "0 1px 3px rgba(0,0,0,.16)"
    }
  })));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextareaField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Meerregelig tekstvak. Afronding 1.5rem in plaats van de pilvorm. */
function TextareaField({
  label,
  hint,
  placeholder,
  value,
  onChange,
  rows = 3,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      fontFamily: "var(--font-family)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--foreground)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: "var(--font-family)",
      fontSize: "1rem",
      fontWeight: "var(--weight-regular)",
      color: "var(--foreground)",
      background: "var(--background)",
      border: "1px solid var(--border-strong)",
      boxSizing: "border-box",
      outline: "none",
      width: "100%",
      borderColor: focus ? "var(--primary)" : "var(--border-strong)",
      borderRadius: "var(--radius)",
      padding: "16px 22px",
      lineHeight: "var(--leading-body)",
      resize: "vertical"
    }
  }, rest)), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { TextareaField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextareaField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Kruimelpad, hoogstens drie niveaus. De laatste kruimel is de huidige pagina en geen link. */
function Breadcrumb({
  items = [],
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Kruimelpad",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-family)",
      flexWrap: "wrap",
      ...style
    }
  }, rest), items.map((item, i) => {
    const laatste = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: item.label
    }, laatste ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-medium)",
        color: "var(--foreground)"
      }
    }, item.label) : /*#__PURE__*/React.createElement("a", {
      href: item.href,
      onClick: e => {
        if (onSelect) {
          e.preventDefault();
          onSelect(i);
        }
      },
      style: {
        fontSize: "var(--text-label)",
        color: "var(--muted-foreground)",
        textDecoration: "none",
        cursor: "pointer"
      }
    }, item.label), laatste ? null : /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--muted-foreground)",
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-right",
      size: 15
    })));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/FloatingNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Zwevende glazen pil. De navigatie is geen balk. */
function FloatingNav({
  items = [],
  activeIndex = 0,
  action,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      fontFamily: "var(--font-family)",
      background: "var(--glass-nav-bg)",
      backdropFilter: "var(--blur-nav)",
      WebkitBackdropFilter: "var(--blur-nav)",
      border: "1px solid var(--glass-nav-border)",
      boxShadow: "var(--shadow-nav)",
      borderRadius: "var(--radius-pill)",
      padding: "8px 8px 8px 24px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "12px 24px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: "assets/memortium-woordmerk.svg",
    alt: "Memortium",
    style: {
      width: 112,
      height: "auto",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 4
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: item.href || "#",
    onClick: onSelect ? e => {
      e.preventDefault();
      onSelect(i);
    } : undefined,
    style: {
      fontSize: "0.875rem",
      fontWeight: "var(--weight-medium)",
      textDecoration: "none",
      borderRadius: "var(--radius-pill)",
      padding: "9px 20px",
      color: i === activeIndex ? "var(--foreground)" : "var(--muted-foreground)",
      background: i === activeIndex ? "var(--background)" : "transparent",
      border: i === activeIndex ? "1px solid var(--border)" : "1px solid transparent",
      boxShadow: i === activeIndex ? "var(--shadow-card)" : "none"
    }
  }, item.label))), action ? /*#__PURE__*/React.createElement("a", {
    href: action.href || "#",
    style: {
      fontSize: "0.875rem",
      fontWeight: "var(--weight-medium)",
      color: "var(--cta-foreground)",
      background: "var(--cta)",
      borderRadius: "var(--radius-pill)",
      height: "var(--control-height-sm)",
      padding: "0 22px",
      display: "inline-flex",
      alignItems: "center",
      textDecoration: "none",
      boxShadow: "var(--shadow-cta)"
    }
  }, action.label) : null);
}
Object.assign(__ds_scope, { FloatingNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/FloatingNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const rond = {
  fontFamily: "var(--font-family)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-medium)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  height: 40,
  minWidth: 40,
  padding: "0 14px",
  boxSizing: "border-box",
  borderRadius: "var(--radius-pill)",
  cursor: "pointer",
  background: "transparent",
  border: "1px solid var(--border-strong)",
  color: "var(--foreground)"
};

/** Bladeren door een lange lijst. Altijd met het totaal erbij, zodat de lezer weet waar hij is. */
function Pagination({
  page = 1,
  pageCount = 1,
  total,
  itemLabel = "regels",
  onChange,
  style,
  ...rest
}) {
  const ga = n => {
    if (onChange && n >= 1 && n <= pageCount) onChange(n);
  };
  const uit = {
    opacity: 0.4,
    cursor: "not-allowed"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      flexWrap: "wrap",
      fontFamily: "var(--font-family)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-label)",
      color: "var(--muted-foreground)"
    }
  }, "Pagina ", page, " van ", pageCount, total != null ? ", " + total + " " + itemLabel : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => ga(page - 1),
    disabled: page <= 1,
    style: {
      ...rond,
      ...(page <= 1 ? uit : null)
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-left",
    size: 17
  }), "Vorige"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => ga(page + 1),
    disabled: page >= pageCount,
    style: {
      ...rond,
      ...(page >= pageCount ? uit : null)
    }
  }, "Volgende", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 17
  }))));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Vaste zijbalk van het portaal. Geen balk met vullingen: alleen een haarlijn rechts. */
function Sidebar({
  items = [],
  activeIndex = 0,
  onSelect,
  footer,
  width = 280,
  base,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      fontFamily: "var(--font-family)",
      width,
      flexShrink: 0,
      boxSizing: "border-box",
      padding: "var(--space-5) var(--space-4)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)",
      borderRight: "1px solid var(--border)",
      background: "var(--background)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    width: 140,
    base: base
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, items.map((item, i) => {
    const actief = i === activeIndex;
    return /*#__PURE__*/React.createElement("a", {
      key: item.label,
      href: item.href,
      onClick: e => {
        if (onSelect) {
          e.preventDefault();
          onSelect(i);
        }
      },
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-2)",
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-medium)",
        textDecoration: "none",
        borderRadius: "var(--radius-pill)",
        padding: "11px 20px",
        cursor: "pointer",
        color: actief ? "var(--foreground)" : "var(--muted-foreground)",
        background: actief ? "var(--background)" : "transparent",
        border: "1px solid " + (actief ? "var(--border)" : "transparent"),
        boxShadow: actief ? "var(--shadow-card)" : "none",
        transition: "all var(--duration-ui) ease"
      }
    }, /*#__PURE__*/React.createElement("span", null, item.label), item.count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-caption)",
        fontWeight: "var(--weight-bold)",
        color: "var(--muted-foreground)"
      }
    }, item.count) : null);
  })), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Het enige grote donkere vlak in een uiting. */
function SiteFooter({
  intro,
  columns = [],
  legal = "\u00a9 Memortium",
  links = "Privacy \u00b7 Voorwaarden",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      fontFamily: "var(--font-family)",
      background: "var(--primary)",
      padding: "56px 40px 40px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/memortium-woordmerk-wit.svg",
    alt: "Memortium",
    style: {
      width: 148,
      height: "auto",
      display: "block"
    }
  }), intro ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "1rem",
      fontWeight: "var(--weight-light)",
      lineHeight: "var(--leading-body)",
      color: "#f0f1f4",
      opacity: 0.72,
      maxWidth: "34ch"
    }
  }, intro) : null), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-micro)",
      color: "#f0f1f4",
      opacity: 0.6
    }
  }, col.title), col.items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    style: {
      fontSize: "var(--text-label)",
      color: "#f0f1f4",
      textDecoration: "none"
    }
  }, it))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(252,252,253,0.12)",
      paddingTop: "var(--space-4)",
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption)",
      color: "#f0f1f4",
      opacity: 0.6
    }
  }, legal), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption)",
      color: "#f0f1f4",
      opacity: 0.6
    }
  }, links)));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tabbladen als pillenrij. Voor twee tot vier weergaven van dezelfde lijst. */
function Tabs({
  items = [],
  activeIndex = 0,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-1)",
      flexWrap: "wrap",
      fontFamily: "var(--font-family)",
      ...style
    }
  }, rest), items.map((item, i) => {
    const actief = i === activeIndex;
    const label = typeof item === "string" ? item : item.label;
    const count = typeof item === "string" ? null : item.count;
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      role: "tab",
      "aria-selected": actief,
      type: "button",
      onClick: () => onSelect && onSelect(i),
      style: {
        fontFamily: "var(--font-family)",
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-medium)",
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        borderRadius: "var(--radius-pill)",
        padding: "10px 20px",
        cursor: "pointer",
        color: actief ? "var(--foreground)" : "var(--muted-foreground)",
        background: actief ? "var(--background)" : "transparent",
        border: "1px solid " + (actief ? "var(--border)" : "transparent"),
        boxShadow: actief ? "var(--shadow-card)" : "none",
        transition: "all var(--duration-ui) ease"
      }
    }, label, count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-caption)",
        fontWeight: "var(--weight-bold)",
        color: "var(--muted-foreground)"
      }
    }, count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.PortraitFigure = __ds_scope.PortraitFigure;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.FileRow = __ds_scope.FileRow;

__ds_ns.KeyValueList = __ds_scope.KeyValueList;

__ds_ns.PageHeader = __ds_scope.PageHeader;

__ds_ns.PriceCard = __ds_scope.PriceCard;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.SummaryRow = __ds_scope.SummaryRow;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DateField = __ds_scope.DateField;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Fieldset = __ds_scope.Fieldset;

__ds_ns.FileDrop = __ds_scope.FileDrop;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.SelectField = __ds_scope.SelectField;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextareaField = __ds_scope.TextareaField;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.FloatingNav = __ds_scope.FloatingNav;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
