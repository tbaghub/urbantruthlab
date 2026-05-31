"use client";
import { useState, useEffect } from "react";

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

const globalStyles = [
  "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');",
  "* { box-sizing: border-box; margin: 0; padding: 0; }",
  "body { background: #0A0A0B; color: #E8E8ED; font-family: 'DM Sans', sans-serif; }",
  "::-webkit-scrollbar { width: 4px; }",
  "::-webkit-scrollbar-track { background: #111113; }",
  "::-webkit-scrollbar-thumb { background: #2A2A2F; border-radius: 2px; }",
  "@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }",
  "@keyframes floatUp { 0% { transform: translateY(0px); opacity: 0.3; } 50% { opacity: 0.8; } 100% { transform: translateY(-100vh); opacity: 0; } }",
  "@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }",
  "@keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.4); } 50% { box-shadow: 0 0 0 12px rgba(245,200,66,0); } }",
  "@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }",
  "@keyframes ripple { 0% { transform: scale(0); opacity: 0.6; } 100% { transform: scale(4); opacity: 0; } }",
  "@keyframes glitch { 0% { transform: translate(-4px); } 25% { transform: translate(4px); } 50% { transform: translate(-2px); } 75% { transform: translate(2px); } 100% { transform: translate(0); } }",
  ".grad-text { background: linear-gradient(135deg, #F5C842, #00FFC2, #F5C842); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: gradientShift 4s ease infinite; }",
  ".fade-in { animation: fadeSlideUp 0.5s ease forwards; }",
  ".btn-ripple { position: relative; overflow: hidden; transition: transform 0.1s ease; }",
  ".btn-ripple:active { transform: scale(0.97); }",
  ".card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }",
  ".card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }",
].join("\n");

function Particles() {
  const particles = Array.from({ length: 15 }, function(_, i) {
    return {
      id: i,
      left: (Math.random() * 100) + "%",
      size: (Math.random() * 4 + 2) + "px",
      delay: (Math.random() * 8) + "s",
      duration: (Math.random() * 8 + 6) + "s",
    };
  });
  return (
    React.createElement("div", { style: { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" } },
      particles.map(function(p) {
        return React.createElement("div", {
          key: p.id,
          style: {
            position: "absolute", bottom: "-20px", left: p.left,
            width: p.size, height: p.size, borderRadius: "50%",
            background: p.id % 2 === 0 ? C.gold : C.electric,
            animation: "floatUp " + p.duration + " " + p.delay + " infinite",
            opacity: 0.4,
          }
        });
      })
    )
  );
}

function Ticker() {
  var tags = [
    "M-Pesa to USDT Arbitrage +23%",
    "Urban Crypto Index UP",
    "Gig Economy Report Q2 2026",
    "Africa Remittance Window OPEN",
    "Shadow Market Watch: Lagos",
    "Street Vendor Index Record High",
    "First-Gen Wealth Play of the Week",
    "Diaspora Arbitrage: $340M Uncaptured",
    "Informal Economy: $7T Global",
  ];
  var text = tags.join("   /   ");
  return (
    React.createElement("div", { style: { background: C.gold, padding: "8px 0", overflow: "hidden" } },
      React.createElement("div", { style: { display: "flex", animation: "marquee 30s linear infinite", whiteSpace: "nowrap" } },
        React.createElement("span", { style: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: C.black, fontWeight: 600, paddingRight: "40px" } },
          text + "     " + text
        )
      )
    )
  );
}

function Nav(props) {
  var page = props.page;
  var setPage = props.setPage;
  var user = props.user;
  var setUser = props.setUser;
  var scrolled = props.scrolled;

  return (
    React.createElement("nav", {
      style: {
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,10,11,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid " + C.border : "1px solid transparent",
        transition: "all 0.3s ease", padding: "0 24px",
      }
    },
      React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 64, gap: 24 } },
        React.createElement("button", {
          onClick: function() { setPage("home"); },
          style: { fontFamily: "'Bebas Neue'", fontSize: 22, color: C.white, background: "none", border: "none", cursor: "pointer", letterSpacing: 2 }
        }, "URBAN", React.createElement("span", { style: { color: C.gold } }, "TRUTH"), "LAB"),
        React.createElement("div", { style: { flex: 1 } }),
        React.createElement("button", {
          onClick: function() { setPage("pricing"); },
          style: { background: "none", border: "none", color: page === "pricing" ? C.gold : C.text, cursor: "pointer", fontSize: 14, fontWeight: 500 }
        }, "Pricing"),
        React.createElement("button", {
          onClick: function() { setPage("dashboard"); },
          style: { background: "none", border: "none", color: page === "dashboard" ? C.gold : C.text, cursor: "pointer", fontSize: 14, fontWeight: 500 }
        }, "Dashboard"),
        user ? (
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
            React.createElement("div", {
              style: { fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.electric, background: "rgba(0,255,194,0.1)", padding: "3px 10px", borderRadius: 20, border: "1px solid " + C.electric }
            }, user.tier),
            React.createElement("div", {
              style: { width: 34, height: 34, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue'", fontSize: 16, color: C.black, cursor: "pointer" },
              onClick: function() { setPage("settings"); }
            }, user.name[0]),
            React.createElement("button", {
              onClick: function() { setUser(null); setPage("home"); },
              style: { background: "none", border: "1px solid " + C.border, color: C.muted, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12 }
            }, "Out")
          )
        ) : (
          React.createElement("div", { style: { display: "flex", gap: 10 } },
            React.createElement("button", {
              onClick: function() { setPage("login"); },
              className: "btn-ripple",
              style: { background: "none", border: "1px solid " + C.border, color: C.text, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13 }
            }, "Login"),
            React.createElement("button", {
              onClick: function() { setPage("signup"); },
              className: "btn-ripple",
              style: { background: C.gold, border: "none", color: C.black, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 }
            }, "Join Now")
          )
        )
      )
    )
  );
}

function HomePage(props) {
  var setPage = props.setPage;
  var features = [
    { icon: "📡", title: "Urban Market Signals", desc: "Real-time data from 47 cities tracking informal economic activity and street-level price shifts." },
    { icon: "₿", title: "Crypto Street Index", desc: "P2P crypto rates vs official rates. Arbitrage windows before they close." },
    { icon: "💸", title: "Remittance Arbitrage", desc: "Beat Western Union by 18-40%. Track the best corridors in real time." },
    { icon: "⚡", title: "Gig Economy Hacks", desc: "Platform algorithm changes, surge prediction, multi-app stacking strategies." },
    { icon: "👁", title: "Shadow Economy Watch", desc: "What $7 trillion in informal GDP means for your neighborhood." },
    { icon: "🏆", title: "First-Gen Wealth Plays", desc: "Asset strategies for people starting at zero. Real moves, no trust funds." },
  ];
  var testimonials = [
    { name: "Amara K.", country: "Lagos", tier: "PRO", text: "Found a remittance corridor saving me $340/month. Paid for 11 years of PRO." },
    { name: "Diego R.", country: "Medellin", tier: "ELITE", text: "The crypto arbitrage signals alone are worth 10x the price." },
    { name: "Priya M.", country: "Nairobi", tier: "PRO", text: "M-Pesa to USDT strategy gave me 23% better rates. Instant ROI." },
    { name: "Marcus T.", country: "Detroit", tier: "ELITE", text: "Shadow Economy Watch flagged regulatory changes 6 weeks early." },
  ];
  var tIdx = useState(0);
  var testimonialIdx = tIdx[0];
  var setTestimonialIdx = tIdx[1];

  useEffect(function() {
    var t = setInterval(function() {
      setTestimonialIdx(function(i) { return (i + 1) % testimonials.length; });
    }, 4000);
    return function() { clearInterval(t); };
  }, []);

  return (
    React.createElement("div", null,
      React.createElement("div", {
        style: { position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: C.black }
      },
        React.createElement(Particles, null),
        React.createElement("div", {
          style: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(42,42,47,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,47,0.2) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }
        }),
        React.createElement("div", {
          style: { textAlign: "center", padding: "120px 24px 80px", position: "relative", zIndex: 2, maxWidth: 900, animation: "fadeSlideUp 0.8s ease forwards" }
        },
          React.createElement("div", { style: { fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.electric, letterSpacing: 4, marginBottom: 24, textTransform: "uppercase" } }, "CLASSIFIED INTELLIGENCE PLATFORM"),
          React.createElement("h1", { style: { fontFamily: "'Bebas Neue'", fontSize: "clamp(48px, 10vw, 96px)", lineHeight: 0.95, letterSpacing: 2, marginBottom: 24 } },
            React.createElement("span", { className: "grad-text" }, "THE INTELLIGENCE"),
            React.createElement("br", null),
            React.createElement("span", { style: { color: C.white } }, "THEY DON'T WANT"),
            React.createElement("br", null),
            React.createElement("span", { style: { color: C.gold } }, "YOU TO HAVE")
          ),
          React.createElement("p", { style: { fontSize: 17, color: C.muted, maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.7 } },
            "Street-level economic signals, crypto arbitrage windows, and underground wealth strategies. For urban entrepreneurs who can't afford to be wrong."
          ),
          React.createElement("div", { style: { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 } },
            React.createElement("button", {
              onClick: function() { setPage("signup"); },
              className: "btn-ripple",
              style: { background: C.gold, color: C.black, border: "none", padding: "16px 36px", borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: "pointer" }
            }, "ACCESS THE LAB"),
            React.createElement("button", {
              onClick: function() { setPage("pricing"); },
              className: "btn-ripple",
              style: { background: "transparent", color: C.text, border: "1px solid " + C.border, padding: "16px 36px", borderRadius: 6, fontSize: 15, cursor: "pointer" }
            }, "View Pricing")
          ),
          React.createElement("div", { style: { display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" } },
            [{ n: "10,847", label: "Members" }, { n: "47", label: "Countries" }, { n: "Daily", label: "Intel Drops" }].map(function(s) {
              return React.createElement("div", { key: s.label, style: { textAlign: "center" } },
                React.createElement("div", { style: { fontFamily: "'Bebas Neue'", fontSize: 32, color: C.gold, letterSpacing: 2 } }, s.n + "+"),
                React.createElement("div", { style: { fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.muted, letterSpacing: 2 } }, s.label.toUpperCase())
              );
            })
          )
        )
      ),
      React.createElement(Ticker, null),
      React.createElement("div", { style: { padding: "80px 24px", maxWidth: 1200, margin: "0 auto" } },
        React.createElement("div", { style: { textAlign: "center", marginBottom: 56 } },
          React.createElement("div", { style: { fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.electric, letterSpacing: 4, marginBottom: 16 } }, "INTELLIGENCE CATEGORIES"),
          React.createElement("h2", { style: { fontFamily: "'Bebas Neue'", fontSize: 48, letterSpacing: 2, color: C.white } }, "WHAT'S INSIDE THE LAB")
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 } },
          features.map(function(f, i) {
            return React.createElement("div", {
              key: f.title, className: "card-hover",
              style: { background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: 28, position: "relative", overflow: "hidden" }
            },
              React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 2, background: i % 2 === 0 ? C.gold : C.electric } }),
              React.createElement("div", { style: { fontSize: 28, marginBottom: 14 } }, f.icon),
              React.createElement("h3", { style: { fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 1.5, color: C.white, marginBottom: 10 } }, f.title),
              React.createElement("p", { style: { color: C.muted, lineHeight: 1.7, fontSize: 14 } }, f.desc)
            );
          })
        )
      ),
      React.createElement("div", { style: { background: C.surface, borderTop: "1px solid " + C.border, borderBottom: "1px solid " + C.border, padding: "80px 24px" } },
        React.createElement("div", { style: { maxWidth: 660, margin: "0 auto", textAlign: "center" } },
          React.createElement("div", { style: { fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.gold, letterSpacing: 4, marginBottom: 36 } }, "MEMBER REPORTS"),
          React.createElement("div", { style: { background: C.card, border: "1px solid " + C.border, borderRadius: 16, padding: 40 } },
            React.createElement("p", { style: { fontSize: 19, lineHeight: 1.7, color: C.text, marginBottom: 28, fontStyle: "italic" } },
              '"' + testimonials[testimonialIdx].text + '"'
            ),
            React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 14 } },
              React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue'", fontSize: 18, color: C.black } },
                testimonials[testimonialIdx].name[0]
              ),
              React.createElement("div", { style: { textAlign: "left" } },
                React.createElement("div", { style: { fontWeight: 600, color: C.white } }, testimonials[testimonialIdx].name),
                React.createElement("div", { style: { fontSize: 13, color: C.muted } }, testimonials[testimonialIdx].country)
              ),
              React.createElement("div", { style: { fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.electric, background: "rgba(0,255,194,0.1)", padding: "4px 10px", borderRadius: 20, border: "1px solid rgba(0,255,194,0.3)" } },
                testimonials[testimonialIdx].tier
              )
            )
          ),
          React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "center", marginTop: 20 } },
            testimonials.map(function(_, i) {
              return React.createElement("button", {
                key: i, onClick: function() { setTestimonialIdx(i); },
                style: { width: i === testimonialIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === testimonialIdx ? C.gold : C.border, border: "none", cursor: "pointer", transition: "all 0.3s ease" }
              });
            })
          )
        )
      ),
      React.createElement("div", { style: { padding: "80px 24px", textAlign: "center", maxWidth: 800, margin: "0 auto" } },
        React.createElement("h2", { style: { fontFamily: "'Bebas Neue'", fontSize: 52, letterSpacing: 2, marginBottom: 16 } },
          React.createElement("span", { className: "grad-text" }, "READY TO KNOW MORE"),
          React.createElement("br", null),
          React.createElement("span", { style: { color: C.white } }, "THAN THEY DO?")
        ),
        React.createElement("p", { style: { color: C.muted, fontSize: 16, marginBottom: 36, lineHeight: 1.7 } }, "Join 10,847 urban operators in 47 countries. Start free. Upgrade when you see the ROI."),
        React.createElement("div", { style: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" } },
          React.createElement("button", {
            onClick: function() { setPage("signup"); }, className: "btn-ripple",
            style: { background: C.gold, color: C.black, border: "none", padding: "16px 40px", borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: "pointer", animation: "pulse 2s infinite" }
          }, "START FOR FREE"),
          React.createElement("button", {
            onClick: function() { setPage("pricing"); }, className: "btn-ripple",
            style: { background: "transparent", color: C.electric, border: "1px solid " + C.electric, padding: "16px 40px", borderRadius: 6, fontSize: 15, cursor: "pointer" }
          }, "COMPARE PLANS")
        )
      ),
      React.createElement("footer", { style: { background: C.surface, borderTop: "1px solid " + C.border, padding: "40px 24px" } },
        React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "center" } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontFamily: "'Bebas Neue'", fontSize: 26, letterSpacing: 2, color: C.white } },
              "URBAN", React.createElement("span", { style: { color: C.gold } }, "TRUTH"), "LAB"
            ),
            React.createElement("div", { style: { color: C.muted, fontSize: 13, marginTop: 6 } }, "The intelligence they don't want you to have.")
          ),
          React.createElement("div", { style: { display: "flex", gap: 8 } },
            React.createElement("input", { placeholder: "your@email.com", style: { background: C.card, border: "1px solid " + C.border, color: C.text, padding: "10px 14px", borderRadius: "6px 0 0 6px", fontSize: 14, outline: "none", width: 200 } }),
            React.createElement("button", { className: "btn-ripple", style: { background: C.gold, color: C.black, border: "none", padding: "10px 18px", borderRadius: "0 6px 6px 0", fontWeight: 700, cursor: "pointer", fontSize: 13 } }, "JOIN")
          )
        ),
        React.createElement("div", { style: { maxWidth: 1200, margin: "24px auto 0", paddingTop: 20, borderTop: "1px solid " + C.border, display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "space-between",
