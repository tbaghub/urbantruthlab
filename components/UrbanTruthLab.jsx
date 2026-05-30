import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────
const C = {
  black: "#0A0A0B",
  surface: "#111113",
  card: "#1A1A1E",
  border: "#2A2A2F",
  gold: "#F5C842",
  electric: "#00FFC2",
  red: "#FF3B3B",
  muted: "#6B6B7A",
  text: "#E8E8ED",
  white: "#FAFAFA",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0A0A0B; color: #E8E8ED; font-family: 'DM Sans', sans-serif; }
  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111113; }
  ::-webkit-scrollbar-thumb { background: #2A2A2F; border-radius: 2px; }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes floatUp {
    0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
    50% { opacity: 0.8; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.4); }
    50% { box-shadow: 0 0 0 12px rgba(245,200,66,0); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanline {
    0% { top: -10%; }
    100% { top: 110%; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(4); opacity: 0; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glitch {
    0% { clip-path: inset(20% 0 60% 0); transform: translate(-4px); }
    20% { clip-path: inset(80% 0 0 0); transform: translate(4px); }
    40% { clip-path: inset(40% 0 40% 0); transform: translate(-2px); }
    60% { clip-path: inset(0 0 80% 0); transform: translate(2px); }
    80% { clip-path: inset(60% 0 20% 0); transform: translate(-4px); }
    100% { clip-path: inset(20% 0 60% 0); transform: translate(0); }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: #2A2A2F; }
    50% { border-color: #F5C842; }
  }
  .grad-text {
    background: linear-gradient(135deg, #F5C842, #00FFC2, #F5C842);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease infinite;
  }
  .fade-in { animation: fadeSlideUp 0.5s ease forwards; }
  .btn-ripple { position: relative; overflow: hidden; }
  .btn-ripple::after {
    content: '';
    position: absolute;
    width: 20px; height: 20px;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%) scale(0);
  }
  .btn-ripple:active::after { animation: ripple 0.4s ease; }
  .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
  .nav-link { position: relative; }
  .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#F5C842; transition: width 0.3s ease; }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .grain::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }
`;

// ─── PARTICLES ───────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 2}px`,
    delay: `${Math.random() * 8}s`,
    duration: `${Math.random() * 8 + 6}s`,
    opacity: Math.random() * 0.5 + 0.2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-20px",
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: Math.random() > 0.5 ? C.gold : C.electric,
            animation: `floatUp ${p.duration} ${p.delay} infinite`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ─── TICKER ──────────────────────────────────────────────────────
function Ticker() {
  const tags = [
    "🔥 M-Pesa to USDT Arbitrage +23%", "⚡ Urban Crypto Index UP", "📊 Gig Economy Report Q2 2026",
    "🌍 Africa Remittance Window OPEN", "💰 Shadow Market Watch: Lagos", "🚨 Debt Trap Alert: 3 Major Banks",
    "📈 Street Vendor Index Record High", "🔑 First-Gen Wealth Play of the Week", "⚠️ Central Bank Digital Surveillance Rising",
    "💡 Diaspora Arbitrage: $340M Uncaptured", "🛒 Informal Economy: $7T Global",
  ];
  const text = tags.join("   •   ");
  return (
    <div style={{ background: C.gold, padding: "8px 0", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", animation: "marquee 30s linear infinite", whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: C.black, fontWeight: 600, paddingRight: "40px" }}>
< truncated lines 155-1119 >
                </div>
                <button onClick={() => setPage("checkout")} className="btn-ripple"
                  style={{ background: C.gold, color: C.black, border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                  UPGRADE PLAN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right widget */}
      <div style={{ width: 260, padding: "32px 20px", borderLeft: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.muted, letterSpacing: 3, marginBottom: 20 }}>HOT SIGNALS</div>
        {signals.slice(0,3).map((s) => (
          <div key={s.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px", marginBottom: 12 }}>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.electric, marginBottom: 4 }}>{s.change} ↑</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{s.name}</div>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: C.muted, marginTop: 4 }}>{s.region}</div>
          </div>
        ))}
        <div style={{ marginTop: 24, fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.muted, letterSpacing: 3, marginBottom: 16 }}>YOUR STATS</div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16 }}>
          {[["Tier", user?.tier || "FREE"], ["Reports Read", "12"], ["Signals Unlocked", user?.tier === "FREE" ? "0/47" : "47/47"]].map(([k,v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: C.white }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS PAGE ────────────────────────────────────────────────
function SettingsPage({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const tabs = ["profile", "notifications", "billing", "security", "connected"];

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh", background: C.black }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
        <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 48, letterSpacing: 2, marginBottom: 40, color: C.white }}>SETTINGS</h1>
        <div style={{ display: "flex", gap: 2, marginBottom: 40, background: C.card, borderRadius: 10, padding: 4, width: "fit-content", border: `1px solid ${C.border}` }}>
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ background: activeTab === t ? C.gold : "none", color: activeTab === t ? C.black : C.muted, border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: activeTab === t ? 700 : 400, textTransform: "capitalize", transition: "all 0.2s" }}>
              {t}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue'", fontSize: 36, color: C.black, cursor: "pointer", border: `3px solid ${C.border}` }}>
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <button className="btn-ripple" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>Upload Photo</button>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: C.muted, marginTop: 6 }}>JPG, PNG max 5MB</div>
              </div>
            </div>
            {[["DISPLAY NAME", user?.name || "Urban Operator"], ["EMAIL", user?.email || "operator@urbantruthlab.io"], ["BIO", "Urban intelligence operator. 10 countries visited."], ["TWITTER/X", "@urbanoperator"]].map(([label, val]) => (
              <div key={label}>
                <label style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: C.muted, letterSpacing: 2, display: "block", marginBottom: 8 }}>{label}</label>
                <input defaultValue={val}
                  style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: "13px 16px", borderRadius: 8, fontSize: 14, outline: "none" }} />
              </div>
            ))}
            <button className="btn-ripple" style={{ background: C.gold, color: C.black, border: "none", padding: "14px 32px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14, width: "fit-content" }}>
              SAVE PROFILE
            </button>
          </div>
        )}

        {activeTab === "security" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 28 }}>
              <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 24, letterSpacing: 1.5, color: C.white, marginBottom: 20 }}>CHANGE PASSWORD</h3>
              {["Current Password", "New Password", "Confirm New Password"].map((f) => (
                <div key={f} style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: C.muted, letterSpacing: 2, display: "block", marginBottom: 8 }}>{f.toUpperCase()}</label>
                  <input type="password" placeholder="••••••••"
                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: "13px 16px", borderRadius: 8, fontSize: 14, outline: "none" }} />
                </div>
              ))}
              <button className="btn-ripple" style={{ background: C.gold, color: C.black, border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>UPDATE PASSWORD</button>
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 28 }}>
              <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: 24, letterSpacing: 1.5, color: C.white, marginBottom: 8 }}>TWO-FACTOR AUTH</h3>
              <p style={{ color: C.muted, fontSize: 14, marginBottom: 20 }}>Protect your account with TOTP authenticator (Google Auth, Authy).</p>
              <button className="btn-ripple" style={{ background: C.electric, color: C.black, border: "none", padding: "12px 28px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>ENABLE 2FA</button>
            </div>
          </div>
        )}

        {(activeTab === "notifications" || activeTab === "billing" || activeTab === "connected") && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 48, textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: C.muted, letterSpacing: 2 }}>{activeTab.toUpperCase()} SETTINGS</div>
            <div style={{ color: C.muted, fontSize: 14, marginTop: 12 }}>Configuration options for {activeTab}.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 404 PAGE ─────────────────────────────────────────────────────
function NotFoundPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative" }}>
      <Particles />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(80px,20vw,160px)", color: C.gold, letterSpacing: 10, lineHeight: 1, animation: "glitch 3s infinite", marginBottom: 24 }}>404</div>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 40, letterSpacing: 3, color: C.white, marginBottom: 16 }}>INTELLIGENCE NOT FOUND</h2>
        <p style={{ color: C.muted, marginBottom: 40 }}>This signal has gone dark. The intel you're looking for doesn't exist or has been classified.</p>
        <button onClick={() => setPage("home")} className="btn-ripple"
          style={{ background: C.gold, color: C.black, border: "none", padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
          RETURN TO BASE →
        </button>
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const showNav = !["signup", "login"].includes(page);

  return (
    <>
      <style>{globalStyles}</style>
      <div className="grain" style={{ minHeight: "100vh", background: C.black }}>
        {showNav && <Nav page={page} setPage={setPage} user={user} setUser={setUser} />}
        <div key={page} className="fade-in">
          {page === "home" && <HomePage setPage={setPage} />}
          {page === "pricing" && <PricingPage setPage={setPage} />}
          {page === "checkout" && <CheckoutPage setPage={setPage} />}
          {page === "signup" && <SignupPage setPage={setPage} setUser={setUser} />}
          {page === "login" && <LoginPage setPage={setPage} setUser={setUser} />}
          {page === "dashboard" && <DashboardPage setPage={setPage} user={user} />}
          {page === "settings" && <SettingsPage user={user} />}
          {page === "404" && <NotFoundPage setPage={setPage} />}
          {!["home","pricing","checkout","signup","login","dashboard","settings","404"].includes(page) && <NotFoundPage setPage={setPage} />}
        </div>
      </div>
    </>
  );
  }
