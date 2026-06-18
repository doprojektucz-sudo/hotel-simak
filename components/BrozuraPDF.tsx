import React from "react";
import {
  Document, Page, Text, View, Image, Font,
  Svg, Path, Circle, Rect, Line,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf", fontStyle: "italic" },
  ],
});

export interface BrozuraPDFProps {
  nazev: string; sablona: string; format: string; orientace: string; layout: string;
  barvaPozadi: string; barvaText: string; barvaAkcentu: string;
  zobrazitLogo?: boolean; zobrazitPaticku?: boolean;
  nadpis: string; podnadpis?: string | null; popis?: string | null;
  datum?: string | null; cas?: string | null; misto?: string | null;
  cena?: string | null; kontakt?: string | null; web?: string | null;
  fotoUrl?: string | null; mapUrl?: string | null; qrDataUrl?: string | null;
  logoBase64?: string | null;
}

const SABLONA: Record<string, string> = {
  AKCE: "KULTURNÍ AKCE", ZVERINOVE_HODY: "ZVĚŘINOVÉ HODY",
  UBYTOVANI: "UBYTOVÁNÍ", RESTAURACE: "RESTAURACE", VSEOBECNE: "",
};

const FORMAT_PT: Record<string, [number, number]> = {
  A3: [841.89, 1190.55], A4: [595.28, 841.89], A5: [419.53, 595.28],
};

const HOTEL = {
  name: "Hotel a Restaurace U Šimáka",
  phone: "728 490 498", email: "hotresrad@seznam.cz",
  address: "Radostín 95, 591 01 Žďár nad Sázavou",
  facebook: "facebook.com/hotelsimak", instagram: "@hotel_u_simaka",
  logo: "/images/logo.webp",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IC = "#c8b99a";
const IconCalendar = ({ sz }: { sz: number }) => <Svg width={sz} height={sz} viewBox="0 0 24 24"><Rect x="3" y="4" width="18" height="18" rx="2" stroke={IC} strokeWidth="1.8" fill="none"/><Line x1="16" y1="2" x2="16" y2="6" stroke={IC} strokeWidth="1.8"/><Line x1="8" y1="2" x2="8" y2="6" stroke={IC} strokeWidth="1.8"/><Line x1="3" y1="10" x2="21" y2="10" stroke={IC} strokeWidth="1.8"/></Svg>;
const IconClock    = ({ sz }: { sz: number }) => <Svg width={sz} height={sz} viewBox="0 0 24 24"><Circle cx="12" cy="12" r="9" stroke={IC} strokeWidth="1.8" fill="none"/><Path d="M12 7v5l3 3" stroke={IC} strokeWidth="1.8" fill="none"/></Svg>;
const IconPin      = ({ sz }: { sz: number }) => <Svg width={sz} height={sz} viewBox="0 0 24 24"><Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={IC} strokeWidth="1.8" fill="none"/><Circle cx="12" cy="9" r="2.5" stroke={IC} strokeWidth="1.5" fill="none"/></Svg>;
const IconTicket   = ({ sz }: { sz: number }) => <Svg width={sz} height={sz} viewBox="0 0 24 24"><Path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4V9z" stroke={IC} strokeWidth="1.8" fill="none"/></Svg>;
const IconPhone    = ({ sz }: { sz: number }) => <Svg width={sz} height={sz} viewBox="0 0 24 24"><Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke={IC} strokeWidth="1.8" fill="none"/></Svg>;
const ICONS = [IconCalendar, IconClock, IconPin, IconTicket, IconPhone];

// ─── Shared ───────────────────────────────────────────────────────────────────

function InfoGrid({ items, s, txt }: { items: {val:string;iconIdx:number}[]; s:number; txt:string }) {
  if (!items.length) return null;
  const sz = 11 * s;
  return (
    <View style={{ flexDirection:"row", flexWrap:"wrap", rowGap:6*s, columnGap:12*s, marginBottom:12*s }}>
      {items.map(({val,iconIdx},i) => {
        const Icon = ICONS[iconIdx];
        return (
          <View key={i} style={{ flexDirection:"row", alignItems:"center", gap:4*s, minWidth:"40%" }}>
            <Icon sz={sz}/>
            <Text style={{ fontSize:10*s, color:txt, opacity:0.82, fontFamily:"Roboto" }}>{val}</Text>
          </View>
        );
      })}
    </View>
  );
}

function QRBlock({ qrUrl, web, s, acc, txt }: { qrUrl:string; web?:string|null; s:number; acc:string; txt:string }) {
  return (
    <View style={{ flexDirection:"row", alignItems:"center", gap:10*s }}>
      <Image src={qrUrl} style={{ width:50*s, height:50*s, borderRadius:2 }}/>
      <View>
        <Text style={{ fontSize:8*s, color:acc, letterSpacing:1.5, textTransform:"uppercase", marginBottom:3*s, fontFamily:"Roboto" }}>Více informací</Text>
        {web && <Text style={{ fontSize:8*s, color:txt, opacity:0.55, fontFamily:"Roboto" }}>{web}</Text>}
      </View>
    </View>
  );
}

function Divider({ s, acc }: { s:number; acc:string }) {
  return (
    <View style={{ flexDirection:"row", alignItems:"center", justifyContent:"center", marginBottom:14*s }}>
      <View style={{ width:35*s, height:0.7, backgroundColor:acc, opacity:0.45, marginHorizontal:5*s }}/>
      <View style={{ width:3.5*s, height:3.5*s, borderRadius:2*s, backgroundColor:acc, opacity:0.65 }}/>
      <View style={{ width:35*s, height:0.7, backgroundColor:acc, opacity:0.45, marginHorizontal:5*s }}/>
    </View>
  );
}

function FooterPDF({ s, acc, txt, bg }: { s:number; acc:string; txt:string; bg:string }) {
  return (
    <View style={{ position:"absolute", bottom:0, left:0, right:0, borderTopWidth:0.5, borderTopColor:acc, backgroundColor:"rgba(0,0,0,0.3)", padding:`${3*s}px ${8*s}px`, flexDirection:"row", flexWrap:"wrap", gap:8*s, alignItems:"center" }}>
      {[HOTEL.phone, HOTEL.email, HOTEL.address, HOTEL.facebook, HOTEL.instagram].map((v,i) => (
        <Text key={i} style={{ fontSize:7*s, color:i>=3?acc:txt, opacity:i>=3?0.85:0.7, fontFamily:"Roboto" }}>{v}</Text>
      ))}
    </View>
  );
}

// ─── Layout: Klasicky ─────────────────────────────────────────────────────────
function LayoutKlasickyPDF({ p, s, pageW, pageH, infoItems, footerH }: any) {
  const { barvaPozadi:bg, barvaText:txt, barvaAkcentu:acc } = p;
  const pad = 32*s;
  const logoOff = p.zobrazitLogo ? 22*s : 0;

  return (
    <Page size={[pageW,pageH]} style={{ backgroundColor:bg, fontFamily:"Roboto", padding:0 }}>
      <View style={{ position:"absolute", top:10*s, left:10*s, right:10*s, bottom:10*s, borderWidth:0.7, borderColor:acc, opacity:0.35 }}/>
      <View style={{ position:"absolute", top:15*s, left:15*s, right:15*s, bottom:15*s, borderWidth:0.4, borderColor:acc, opacity:0.15 }}/>

      {p.zobrazitLogo && (
        <View style={{ position:"absolute", top:8*s, left:0, right:0, alignItems:"center", zIndex:10 }}>
          <Image src={p.logoBase64 || HOTEL.logo} style={{ height:18*s, objectFit:"contain" }}/>
        </View>
      )}

      <View style={{ flex:1, paddingHorizontal:pad, paddingTop:pad+logoOff, paddingBottom:pad+footerH, flexDirection:"column", alignItems:"center" }}>
        <Text style={{ fontSize:9*s, color:acc, letterSpacing:3, textTransform:"uppercase", marginBottom:5*s }}>Hotel U Šimáka</Text>
        <View style={{ width:55*s, height:0.7, backgroundColor:acc, opacity:0.45, marginBottom:14*s }}/>

        {p.fotoUrl && <Image src={p.fotoUrl} style={{ width:"100%", height:140*s, objectFit:"cover", borderRadius:2, marginBottom:14*s, opacity:0.85 }}/>}

        {SABLONA[p.sablona] && <Text style={{ fontSize:9*s, color:acc, letterSpacing:2.5, textTransform:"uppercase", opacity:0.85, marginBottom:6*s }}>{SABLONA[p.sablona]}</Text>}

        <Text style={{ fontSize:34*s, fontWeight:700, color:txt, textAlign:"center", lineHeight:1.2, marginBottom:8*s }}>{p.nadpis}</Text>
        {p.podnadpis && <Text style={{ fontSize:15*s, fontStyle:"italic", color:txt, textAlign:"center", opacity:0.78, marginBottom:10*s }}>{p.podnadpis}</Text>}

        <Divider s={s} acc={acc}/>

        {p.popis && <Text style={{ fontSize:11*s, color:txt, textAlign:"center", opacity:0.72, lineHeight:1.6, maxWidth:"82%", marginBottom:16*s }}>{p.popis}</Text>}
        <View style={{ flex:1 }}/>
        {p.mapUrl && <Image src={p.mapUrl} style={{ width:"100%", height:60*s, objectFit:"cover", borderRadius:2, marginBottom:14*s }}/>}
        <InfoGrid items={infoItems} s={s} txt={txt}/>
        {p.qrDataUrl && <QRBlock qrUrl={p.qrDataUrl} web={p.web} s={s} acc={acc} txt={txt}/>}
      </View>

      {p.zobrazitPaticku && <FooterPDF s={s} acc={acc} txt={txt} bg={bg}/>}
    </Page>
  );
}

// ─── Layout: Magazin ──────────────────────────────────────────────────────────
function LayoutMagazinPDF({ p, s, pageW, pageH, infoItems, footerH }: any) {
  const { barvaPozadi:bg, barvaText:txt, barvaAkcentu:acc } = p;
  const pad = 28*s;
  const heroH = pageH * 0.42;

  return (
    <Page size={[pageW,pageH]} style={{ backgroundColor:bg, fontFamily:"Roboto", padding:0 }}>
      {p.fotoUrl && (
        <View style={{ position:"absolute", top:0, left:0, right:0, height:heroH }}>
          <Image src={p.fotoUrl} style={{ width:"100%", height:heroH, objectFit:"cover" }}/>
          <View style={{ position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.5)" }}/>
        </View>
      )}
      {p.zobrazitLogo && (
        <View style={{ position:"absolute", top:8*s, left:0, right:0, alignItems:"center", zIndex:10 }}>
          <Image src={p.logoBase64 || HOTEL.logo} style={{ height:16*s, objectFit:"contain" }}/>
        </View>
      )}
      <View style={{ position:"absolute", top:heroH*0.55, left:pad, right:pad }}>
        {SABLONA[p.sablona] && <Text style={{ fontSize:9*s, color:acc, letterSpacing:2, textTransform:"uppercase", marginBottom:4*s }}>{SABLONA[p.sablona]}</Text>}
        <Text style={{ fontSize:36*s, fontWeight:700, color:"#ffffff", lineHeight:1.15 }}>{p.nadpis}</Text>
      </View>
      <View style={{ position:"absolute", top:heroH+8*s, left:pad, right:pad, bottom:footerH, flexDirection:"column" }}>
        {p.podnadpis && <Text style={{ fontSize:14*s, fontStyle:"italic", color:txt, opacity:0.78, marginBottom:8*s }}>{p.podnadpis}</Text>}
        <View style={{ width:20*s, height:2*s, backgroundColor:acc, borderRadius:s, marginBottom:10*s }}/>
        {p.popis && <Text style={{ fontSize:11*s, color:txt, opacity:0.75, lineHeight:1.55, marginBottom:10*s }}>{p.popis}</Text>}
        <View style={{ flex:1 }}/>
        {p.mapUrl && <Image src={p.mapUrl} style={{ width:"100%", height:55*s, objectFit:"cover", borderRadius:2, marginBottom:12*s }}/>}
        <InfoGrid items={infoItems} s={s} txt={txt}/>
        {p.qrDataUrl && <QRBlock qrUrl={p.qrDataUrl} web={p.web} s={s} acc={acc} txt={txt}/>}
      </View>
      {p.zobrazitPaticku && <FooterPDF s={s} acc={acc} txt={txt} bg={bg}/>}
    </Page>
  );
}

// ─── Layout: Minima ───────────────────────────────────────────────────────────
function LayoutMinimaPDF({ p, s, pageW, pageH, infoItems, footerH }: any) {
  const { barvaPozadi:bg, barvaText:txt, barvaAkcentu:acc } = p;
  const pad = 36*s;
  const logoOff = p.zobrazitLogo ? 24*s : 0;

  return (
    <Page size={[pageW,pageH]} style={{ backgroundColor:bg, fontFamily:"Roboto", padding:0, flexDirection:"column" }}>
      <View style={{ height:3*s, backgroundColor:acc }}/>
      {p.zobrazitLogo && (
        <View style={{ position:"absolute", top:8*s, left:0, right:0, alignItems:"center", zIndex:10 }}>
          <Image src={p.logoBase64 || HOTEL.logo} style={{ height:16*s, objectFit:"contain" }}/>
        </View>
      )}
      <View style={{ flex:1, padding:pad, paddingTop:pad+logoOff, paddingBottom:pad+footerH, flexDirection:"column" }}>
        <Text style={{ fontSize:9*s, color:acc, letterSpacing:2, textTransform:"uppercase", marginBottom:24*s, fontWeight:700 }}>Hotel U Šimáka</Text>
        <Text style={{ fontSize:40*s, fontWeight:700, color:txt, lineHeight:1.1, marginBottom:10*s }}>{p.nadpis}</Text>
        {p.podnadpis && <Text style={{ fontSize:14*s, color:acc, fontWeight:700, marginBottom:16*s, textTransform:"uppercase", letterSpacing:1 }}>{p.podnadpis}</Text>}
        {p.popis && <Text style={{ fontSize:11*s, color:txt, opacity:0.7, lineHeight:1.6, maxWidth:"80%", marginBottom:16*s }}>{p.popis}</Text>}
        <View style={{ flex:1 }}/>
        {p.fotoUrl && <Image src={p.fotoUrl} style={{ width:"100%", height:80*s, objectFit:"cover", marginBottom:16*s, opacity:0.8 }}/>}
        {p.mapUrl && <Image src={p.mapUrl} style={{ width:"100%", height:55*s, objectFit:"cover", borderRadius:2, marginBottom:14*s }}/>}
        <InfoGrid items={infoItems} s={s} txt={txt}/>
        {p.qrDataUrl && <QRBlock qrUrl={p.qrDataUrl} web={p.web} s={s} acc={acc} txt={txt}/>}
      </View>
      {p.zobrazitPaticku ? <FooterPDF s={s} acc={acc} txt={txt} bg={bg}/> : <View style={{ height:1.5*s, backgroundColor:acc, opacity:0.4 }}/>}
    </Page>
  );
}

// ─── Layout: Siroky ───────────────────────────────────────────────────────────
function LayoutSirokyPDF({ p, s, pageW, pageH, infoItems, footerH }: any) {
  const { barvaPozadi:bg, barvaText:txt, barvaAkcentu:acc } = p;
  const pad = 30*s;
  const colW = pageW * 0.44;

  return (
    <Page size={[pageW,pageH]} style={{ backgroundColor:bg, fontFamily:"Roboto", padding:0, flexDirection:"row" }}>
      <View style={{ width:colW, position:"relative" }}>
        {p.fotoUrl
          ? <Image src={p.fotoUrl} style={{ width:colW, height:pageH, objectFit:"cover" }}/>
          : <View style={{ width:colW, height:pageH, backgroundColor:`${acc}22` }}/>}
        <View style={{ position:"absolute", top:0, left:0, right:0, bottom:0, backgroundColor:"rgba(0,0,0,0.15)" }}/>
        {p.zobrazitLogo && (
          <View style={{ position:"absolute", top:8*s, left:6*s }}>
            <Image src={p.logoBase64 || HOTEL.logo} style={{ height:14*s, objectFit:"contain" }}/>
          </View>
        )}
      </View>
      <View style={{ flex:1, padding:pad, paddingBottom:pad+footerH, flexDirection:"column", justifyContent:"space-between" }}>
        <View>
          <Text style={{ fontSize:8*s, color:acc, letterSpacing:2.5, textTransform:"uppercase", marginBottom:12*s }}>Hotel U Šimáka</Text>
          {SABLONA[p.sablona] && <Text style={{ fontSize:9*s, color:acc, letterSpacing:2, textTransform:"uppercase", opacity:0.85, marginBottom:8*s }}>{SABLONA[p.sablona]}</Text>}
          <Text style={{ fontSize:32*s, fontWeight:700, color:txt, lineHeight:1.2, marginBottom:10*s }}>{p.nadpis}</Text>
          {p.podnadpis && <Text style={{ fontSize:13*s, fontStyle:"italic", color:txt, opacity:0.75, marginBottom:12*s }}>{p.podnadpis}</Text>}
          <View style={{ width:20*s, height:1.5*s, backgroundColor:acc, marginBottom:14*s }}/>
          {p.popis && <Text style={{ fontSize:10*s, color:txt, opacity:0.72, lineHeight:1.6 }}>{p.popis}</Text>}
        </View>
        <View>
          {p.mapUrl && <Image src={p.mapUrl} style={{ width:"100%", height:60*s, objectFit:"cover", borderRadius:2, marginBottom:14*s }}/>}
          <InfoGrid items={infoItems} s={s} txt={txt}/>
          {p.qrDataUrl && <QRBlock qrUrl={p.qrDataUrl} web={p.web} s={s} acc={acc} txt={txt}/>}
        </View>
      </View>
      {p.zobrazitPaticku && <FooterPDF s={s} acc={acc} txt={txt} bg={bg}/>}
    </Page>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function BrozuraPDF(p: BrozuraPDFProps) {
  const [baseW, baseH] = FORMAT_PT[p.format] || FORMAT_PT.A4;
  const isLandscape = p.orientace === "LANDSCAPE";
  const pageW = isLandscape ? baseH : baseW;
  const pageH = isLandscape ? baseW : baseH;
  const s = pageW / 595;

  const infoItems = [
    { val: p.datum,   iconIdx: 0 }, { val: p.cas,     iconIdx: 1 },
    { val: p.misto,   iconIdx: 2 }, { val: p.cena,    iconIdx: 3 },
    { val: p.kontakt, iconIdx: 4 },
  ].filter((i): i is { val: string; iconIdx: number } => !!i.val);

  const footerH = p.zobrazitPaticku ? 18 * s : 0;
  const lp = { p, s, pageW, pageH, infoItems, footerH };

  const layout = p.layout || "KLASICKY";

  return (
    <Document>
      {layout === "MAGAZIN"  && <LayoutMagazinPDF  {...lp}/>}
      {layout === "MINIMA"   && <LayoutMinimaPDF   {...lp}/>}
      {layout === "SIROKY"   && <LayoutSirokyPDF   {...lp}/>}
      {/* All other layouts use Klasicky for PDF (VINTAGE, SPLIT etc are complex with CSS features) */}
      {(layout === "KLASICKY" || layout === "VINTAGE" || layout === "SVETLY_CARD" || layout === "SPLIT" || layout === "MIKROMINIMA") && <LayoutKlasickyPDF {...lp}/>}
    </Document>
  );
}
