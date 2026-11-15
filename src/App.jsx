import React, { useEffect, useMemo, useState } from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring
} from "framer-motion";

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  CloudRain,
  Compass,
  Download,
  Droplets,
  Gauge,
  Wind,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  Thermometer,
  Waves,
  X,
  Zap
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Legend
} from "recharts";


// ==========================================
// CONFIGURATION
// ==========================================

const GOLD = "#d7b56d";

const initialWeather = {
  temperature: 29,
  humidity: 68,
  windSpeed: 8,
  pressure: 1012,
  rainfall: 0
};

const history = [
  { day: "Mon", actual: 82, predicted: 86 },
  { day: "Tue", actual: 96, predicted: 92 },
  { day: "Wed", actual: 108, predicted: 111 },
  { day: "Thu", actual: 101, predicted: 105 },
  { day: "Fri", actual: 124, predicted: 120 },
  { day: "Sat", actual: 137, predicted: 133 },
  { day: "Sun", actual: 119, predicted: 122 }
];

const initialScatterData = [
  { temperature: 20, pm25: 64 },
  { temperature: 22, pm25: 72 },
  { temperature: 24, pm25: 79 },
  { temperature: 26, pm25: 91 },
  { temperature: 28, pm25: 108 },
  { temperature: 30, pm25: 117 },
  { temperature: 32, pm25: 136 },
  { temperature: 34, pm25: 149 },
  { temperature: 36, pm25: 158 }
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};


// ==========================================
// CURSOR ANIMATION
// ==========================================

function GoldCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = e => setPos({
      x: e.clientX,
      y: e.clientY
    });

    const down = () => setActive(true);
    const up = () => setActive(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <motion.div
      className="cursor-glow"
      animate={{
        x: pos.x - 13,
        y: pos.y - 13,
        scale: active ? 0.72 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35
      }}
    />
  );
}


// ==========================================
// GOLD PARTICLES
// ==========================================

function GoldDust() {
  const dots = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 61 + 7) % 100}%`,
        delay: `${(i % 9) * 0.43}s`,
        size: i % 5 === 0 ? 3 : 2
      })),
    []
  );

  return (
    <div className="gold-dust" aria-hidden="true">
      {dots.map((dot, i) => (
        <i
          key={i}
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: dot.delay,
            width: dot.size,
            height: dot.size
          }}
        />
      ))}
    </div>
  );
}


// ==========================================
// BRAND
// ==========================================

function Brand({ small = false }) {
  return (
    <div className={`brand ${small ? "brand-small" : ""}`}>
      <div className="brand-mark">
        <Activity size={small ? 17 : 20} strokeWidth={1.7} />
      </div>

      <span>
        AIR<span className="gold-text">CAST</span>
      </span>
    </div>
  );
}


// ==========================================
// LOGIN
// ==========================================

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-shell">
      <GoldDust />

      <div className="auth-left">
        <Brand />

        <div className="auth-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            AIR QUALITY INTELLIGENCE
          </div>

          <h1>
            See the air.
            <br />
            <em>Understand</em> tomorrow.
          </h1>

          <p>
            Turn weather signals into clearer air-quality
            insights with a beautifully simple intelligence
            workspace.
          </p>

          <div className="auth-stat-row">
            <div>
              <strong>01</strong>
              <span>Observe</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Understand</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Anticipate</span>
            </div>
          </div>
        </div>

        <div className="auth-foot">
          A clearer perspective on the atmosphere.
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="mobile-brand">
            <Brand />
          </div>

          <div className="eyebrow">WELCOME BACK</div>

          <h2>Sign in to AirCast</h2>

          <p className="muted">
            Your environmental intelligence, in one place.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              onLogin(email);
            }}
          >
            <label>Email address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <div className="label-row">
              <label>Password</label>

              <button
                type="button"
                className="text-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <button className="gold-button full" type="submit">
              Enter AirCast
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="auth-divider">
            <span />
            OR
            <span />
          </div>

          <button
            className="outline-button full"
            onClick={() => onLogin("guest@aircast.demo")}
          >
            Continue as demo guest
          </button>

          <p className="tiny-note">
            Demo sign-in only. Secure account authentication
            will be connected in a later backend step.
          </p>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// ONBOARDING
// ==========================================

function Onboarding({ onComplete, email }) {
  const [city, setCity] = useState("Bengaluru");
  const [role, setRole] = useState("Student / Researcher");
  const [goal, setGoal] = useState("Explore air quality trends");
  const [unit, setUnit] = useState("Celsius (°C)");

  return (
    <div className="onboard-shell">
      <GoldDust />

      <div className="onboard-top">
        <Brand small />

        <span className="step-label">
          YOUR WORKSPACE <b>01 / 01</b>
        </span>
      </div>

      <motion.div
        className="onboard-card"
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <div className="eyebrow">
          <span className="eyebrow-line" />
          A FEW DETAILS BEFORE WE BEGIN
        </div>

        <h1>
          Make AirCast <em>yours.</em>
        </h1>

        <p className="muted">
          Personalise your workspace. You can change
          these preferences later.
        </p>

        <div className="onboard-grid">
          <div className="field-block">
            <label>Primary city</label>

            <input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter your city"
            />
          </div>

          <div className="field-block">
            <label>I'm using AirCast as a...</label>

            <div className="select-wrap">
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option>Student / Researcher</option>
                <option>Environmental enthusiast</option>
                <option>Analyst</option>
                <option>Professional</option>
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          <div className="field-block">
            <label>What would you like to explore?</label>

            <div className="select-wrap">
              <select
                value={goal}
                onChange={e => setGoal(e.target.value)}
              >
                <option>Explore air quality trends</option>
                <option>
                  Understand weather and PM2.5 relationships
                </option>
                <option>Compare prediction models</option>
                <option>Study future pollution patterns</option>
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          <div className="field-block">
            <label>Temperature unit</label>

            <div className="select-wrap">
              <select
                value={unit}
                onChange={e => setUnit(e.target.value)}
              >
                <option>Celsius (°C)</option>
                <option>Fahrenheit (°F)</option>
              </select>

              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="onboard-bottom">
          <span>
            <Sparkles size={15} />
            Tailored to your interests
          </span>

          <button
            className="gold-button"
            onClick={() =>
              onComplete({ city, role, goal, unit, email })
            }
          >
            Build my workspace
            <ArrowRight size={17} />
          </button>
        </div>
      </motion.div>

      <div className="onboard-foot">
        AIRCAST · AIR QUALITY INTELLIGENCE
      </div>
    </div>
  );
}


// ==========================================
// METRIC CARD
// ==========================================

function Metric({ icon: Icon, label, value, unit, note }) {
  return (
    <motion.div
      className="metric-card glass-card"
      variants={fadeUp}
    >
      <div className="metric-top">
        <span className="metric-icon">
          <Icon size={17} />
        </span>

        <span className="metric-label">{label}</span>

        <ArrowUpRight size={15} className="subtle-icon" />
      </div>

      <div className="metric-value">
        {value}
        <small>{unit}</small>
      </div>

      <div className="metric-note">{note}</div>
    </motion.div>
  );
}


// ==========================================
// CHART CARD
// ==========================================

function ChartCard({ title, subtitle, children, tag }) {
  return (
    <motion.section
      className="panel chart-panel"
      variants={fadeUp}
    >
      <div className="panel-heading">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>

        {tag && (
          <span className="chart-tag">{tag}</span>
        )}
      </div>

      <div className="chart-wrap">
        {children}
      </div>
    </motion.section>
  );
}


// ==========================================
// DASHBOARD
// ==========================================

function Dashboard({ profile, onLogout }) {
  const [weather, setWeather] = useState(initialWeather);
  const [result, setResult] = useState(null);
  const [activeNav, setActiveNav] = useState("Overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [forecastDays, setForecastDays] = useState("7 days");
  const [notice, setNotice] = useState("");

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30
  });

  const fields = [
    ["temperature", "Temperature", "°C", 0, 50, Thermometer],
    ["humidity", "Relative humidity", "%", 0, 100, Droplets],
    ["windSpeed", "Wind speed", "km/h", 0, 100, Wind],
    ["pressure", "Atmospheric pressure", "hPa", 900, 1100, Gauge],
    ["rainfall", "Rainfall", "mm", 0, 200, CloudRain]
  ];

  const navItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Prediction", icon: Gauge },
    { name: "Analytics", icon: BarChart3 },
    { name: "Forecast", icon: Waves }
  ];

  const update = (key, value) => {
    setWeather(prev => ({
      ...prev,
      [key]: value === "" ? "" : Number(value)
    }));
  };


  // ========================================
  // PM2.5 DEMO PREDICTION
  // ========================================

  const predict = () => {
    const limits = {
      temperature: [0, 50],
      humidity: [0, 100],
      windSpeed: [0, 100],
      pressure: [900, 1100],
      rainfall: [0, 200]
    };

    for (const key of Object.keys(limits)) {
      const value = weather[key];
      const [min, max] = limits[key];

      if (
        value === "" ||
        !Number.isFinite(value) ||
        value < min ||
        value > max
      ) {
        setNotice(`Please enter a valid ${key} value.`);
        setTimeout(() => setNotice(""), 4000);
        return;
      }
    }

    /*
      IMPORTANT:
      This is an illustrative frontend formula.
      It is NOT a trained PM2.5 regression model.
      Replace it with your trained model/API output
      when your backend is ready.
    */

    const {
      temperature,
      humidity,
      windSpeed,
      pressure,
      rainfall
    } = weather;

    const rawPM25 =
      18 +
      Math.max(0, (temperature - 15) * 0.9) +
      Math.max(0, (humidity - 30) * 0.22) +
      Math.max(0, (15 - windSpeed) * 0.8) +
      Math.max(0, (1013 - pressure) * 0.18) -
      Math.min(rainfall * 0.7, 14);

    const pm25 = Math.max(
      0,
      Math.min(300, Number(rawPM25.toFixed(1)))
    );

    setResult({
      pm25,
      category: "Demo estimate",
      temperature,
      humidity,
      windSpeed,
      pressure,
      rainfall,
      generatedAt: new Date().toLocaleString()
    });

    setActiveNav("Prediction");

    setNotice(
      "Illustrative PM2.5 demo estimate generated — not a trained-model prediction."
    );

    setTimeout(() => setNotice(""), 5000);
  };


  // ========================================
  // DYNAMIC CHART DATA
  // ========================================

  const chartHistory = useMemo(() => {
    if (!result) return history;

    const offsets = [-24, -16, -10, -5, 8, 14, 0];

    return offsets.map((offset, index) => {
      const value = Math.max(
        0,
        Math.min(500, result.pm25 + offset)
      );

      return {
        day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
        actual: value,
        predicted: Math.max(
          0,
          value + (index % 2 === 0 ? 3 : -3)
        )
      };
    });
  }, [result]);


  const dynamicScatterData = useMemo(() => {
    if (!result) return initialScatterData;

    const offsets = [-8, -6, -4, -2, 0, 2, 4, 6, 8];

    return offsets.map((offset, index) => ({
      temperature: Math.max(
        0,
        Math.min(50, result.temperature + offset)
      ),
      pm25: Math.max(
        0,
        Math.min(
          500,
          result.pm25 + offset * 3 + (index % 2 === 0 ? 5 : -5)
        )
      )
    }));
  }, [result]);


  // ========================================
  // FORECAST SCENARIO
  // ========================================

  const forecastData = useMemo(() => {
    const numberOfDays =
      forecastDays === "7 days"
        ? 7
        : forecastDays === "14 days"
        ? 14
        : 30;

    const base = result?.pm25 ?? 124;

    return Array.from(
      { length: numberOfDays + 1 },
      (_, index) => {
        const variation =
          Math.sin(index * 0.8) * 12 +
          Math.cos(index * 0.35) * 7;

        return {
          day: index === 0 ? "Today" : `Day ${index}`,
          predicted: Math.max(
            0,
            Math.min(500, Math.round(base + variation))
          )
        };
      }
    );
  }, [forecastDays, result]);


  // ========================================
  // REPORT DOWNLOAD
  // ========================================

  const exportReport = () => {
    if (!result) return;

    const lines = [
      "AIRCAST PM2.5 PREDICTION REPORT",
      "================================",
      `City: ${profile.city}`,
      `Generated: ${result.generatedAt}`,
      "",
      "WEATHER INPUTS",
      `Temperature: ${result.temperature} °C`,
      `Humidity: ${result.humidity} %`,
      `Wind speed: ${result.windSpeed} km/h`,
      `Atmospheric pressure: ${result.pressure} hPa`,
      `Rainfall: ${result.rainfall} mm`,
      "",
      "RESULT",
      `PM2.5 demo score: ${result.pm25}`,
      `Category: ${result.category}`,
      "",
      "DISCLAIMER",
      "This is an illustrative frontend demo score.",
      "It is not a measured PM2.5 concentration.",
      "A scientifically validated PM2.5 prediction requires historical pollution measurements and a trained model."
    ];

    const blob = new Blob(
      [lines.join("\n")],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "aircast-pm25-report.txt";
    a.click();

    URL.revokeObjectURL(url);
  };


  // ========================================
  // PAGE TITLES
  // ========================================

  const sectionTitle = {
    Overview: [
      "Your atmosphere, at a glance.",
      "Explore the latest weather inputs and air-quality insights."
    ],
    Prediction: [
      "A prediction, shaped by weather.",
      "Enter local weather conditions to generate a demo estimate."
    ],
    Analytics: [
      "Read between the signals.",
      "Explore illustrative relationships between weather and PM2.5 scores."
    ],
    Forecast: [
      "Look a little further ahead.",
      "Explore a scenario based on your latest demo prediction."
    ]
  }[activeNav];

  const displayWeather = result || weather;
  const displayPM25 = result?.pm25 ?? "—";


  // ========================================
  // DASHBOARD UI
  // ========================================

  return (
    <div className="app-shell">

      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      <GoldDust />


      {/* SIDEBAR */}

      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>

        <div className="sidebar-brand">
          <Brand />
        </div>

        <div className="workspace-label">
          WORKSPACE
        </div>

        <div className="nav-list">
          {navItems.map(item => (
            <button
              key={item.name}
              className={`nav-item ${activeNav === item.name ? "active" : ""}`}
              onClick={() => {
                setActiveNav(item.name);
                setMobileNav(false);
              }}
            >
              <item.icon size={17} />
              {item.name}

              {activeNav === item.name && (
                <span className="nav-active-dot" />
              )}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">

          <div className="sidebar-status">
            <span className="status-dot" />
            DEMO ENVIRONMENT
          </div>

          <div className="profile-mini">
            <div className="avatar">
              {(profile.email || "A").slice(0, 1).toUpperCase()}
            </div>

            <div>
              <strong>
                {profile.email?.split("@")[0] || "Explorer"}
              </strong>

              <small>{profile.city}</small>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            <LogOut size={16} />
            Sign out
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="main-content">

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? <X /> : <Menu />}
          </button>

          <div className="topbar-location">
            <Compass size={15} />
            {profile.city}
          </div>

          <div className="topbar-right">
            <span className="topbar-status">
              <span className="status-dot" />
              DEMO LIVE
            </span>

            <button
              className="notification-button"
              title="Notifications"
            >
              <Bell size={17} />
            </button>

            <div className="avatar small-avatar">
              {(profile.email || "A").slice(0, 1).toUpperCase()}
            </div>
          </div>

        </header>


        <div className="dashboard-content">

          {/* PAGE HEADING */}

          <motion.div
            className="page-heading"
            key={activeNav}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                AIRCAST INTELLIGENCE
              </div>

              <h1>{sectionTitle[0]}</h1>

              <p>{sectionTitle[1]}</p>
            </div>

            <div className="heading-date">
              <Compass size={15} />
              {profile.city}
            </div>
          </motion.div>


          {/* ===================================
              OVERVIEW
          =================================== */}

          {activeNav === "Overview" && (

            <motion.div
              className="overview-section"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
            >

              <div className="metric-grid">

                <Metric
                  icon={Thermometer}
                  label="TEMPERATURE"
                  value={displayWeather.temperature}
                  unit="°C"
                  note="Current input"
                />

                <Metric
                  icon={Droplets}
                  label="HUMIDITY"
                  value={displayWeather.humidity}
                  unit="%"
                  note="Relative humidity"
                />

                <Metric
                  icon={Wind}
                  label="WIND SPEED"
                  value={displayWeather.windSpeed}
                  unit="km/h"
                  note="Wind observation"
                />

                <Metric
                  icon={Activity}
                  label="PM2.5 DEMO SCORE"
                  value={displayPM25}
                  unit=""
                  note={
                    result
                      ? "Latest demo estimate"
                      : "Awaiting prediction"
                  }
                />

              </div>


              <div className="overview-grid">

                <ChartCard
                  title="PM2.5 trend overview"
                  subtitle="Illustrative values, not live measurements"
                  tag="WEEKLY"
                >

                  <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={chartHistory}>

                      <defs>
                        <linearGradient
                          id="pm25Gradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={GOLD}
                            stopOpacity={0.3}
                          />

                          <stop
                            offset="100%"
                            stopColor={GOLD}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        stroke="#ffffff0d"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="day"
                        stroke="#77736a"
                        tickLine={false}
                        axisLine={false}
                      />

                      <YAxis
                        stroke="#77736a"
                        tickLine={false}
                        axisLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          background: "#171612",
                          border: "1px solid #5a492b",
                          borderRadius: 10
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="actual"
                        name="Illustrative PM2.5"
                        stroke={GOLD}
                        strokeWidth={2.5}
                        fill="url(#pm25Gradient)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </ChartCard>


                <div className="panel overview-side-panel">

                  <div className="panel-heading">
                    <div>
                      <h3>Weather snapshot</h3>
                      <p>Latest entered conditions</p>
                    </div>

                    <CloudRain
                      size={19}
                      className="gold-text"
                    />
                  </div>

                  <div className="snapshot-list">

                    <div>
                      <span>Temperature</span>
                      <strong>{displayWeather.temperature} °C</strong>
                    </div>

                    <div>
                      <span>Humidity</span>
                      <strong>{displayWeather.humidity}%</strong>
                    </div>

                    <div>
                      <span>Wind speed</span>
                      <strong>{displayWeather.windSpeed} km/h</strong>
                    </div>

                    <div>
                      <span>Pressure</span>
                      <strong>{displayWeather.pressure} hPa</strong>
                    </div>

                    <div>
                      <span>Rainfall</span>
                      <strong>{displayWeather.rainfall} mm</strong>
                    </div>

                  </div>

                  <button
                    className="gold-button full"
                    onClick={() => setActiveNav("Prediction")}
                  >
                    New prediction
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>


              <div className="bottom-note">
                <Sparkles size={16} />

                <span>
                  {result
                    ? "Dashboard updated using your latest demo estimate. Graph points are illustrative."
                    : "Enter weather values in Prediction to generate your first PM2.5 demo estimate."}
                </span>
              </div>

            </motion.div>

          )}


          {/* ===================================
              PREDICTION
          =================================== */}

          {activeNav === "Prediction" && (

            <div className="prediction-layout">

              <section className="panel input-panel">

                <div className="panel-heading">

                  <div>
                    <h3>Weather conditions</h3>

                    <p>
                      Enter the observations you want to analyse.
                    </p>
                  </div>

                  <span className="chart-tag">
                    CUSTOM INPUT
                  </span>

                </div>


                <div className="input-grid">

                  {fields.map(
                    ([key, label, unit, min, max, Icon]) => (

                      <div
                        className="weather-field"
                        key={key}
                      >

                        <label>
                          <Icon size={15} />
                          {label}
                          <span>({unit})</span>
                        </label>

                        <input
                          type="number"
                          min={min}
                          max={max}
                          step="any"
                          value={weather[key]}
                          onChange={e =>
                            update(key, e.target.value)
                          }
                        />

                        <div className="field-range">
                          <span>{min} {unit}</span>
                          <span>{max} {unit}</span>
                        </div>

                      </div>

                    )
                  )}

                </div>


                <button
                  className="gold-button predict-button"
                  onClick={predict}
                >
                  <Zap size={16} />
                  Predict PM2.5
                  <ArrowRight size={16} />
                </button>


                <p className="form-hint">
                  This prototype uses an illustrative scoring
                  formula. It is not a trained or validated
                  environmental prediction model.
                </p>

              </section>


              {/* RESULT PANEL */}

              <section className="panel result-panel">

                <div className="panel-heading">

                  <div>
                    <h3>Prediction result</h3>

                    <p>
                      Your estimated PM2.5 demo output.
                    </p>
                  </div>

                  <Gauge
                    size={19}
                    className="gold-text"
                  />

                </div>


                {result ? (

                  <motion.div
                    key={result.pm25}
                    initial={{
                      opacity: 0,
                      scale: 0.94
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    className="result-content"
                  >

                    <div className="result-number">
                      {result.pm25}
                      <small>DEMO PM2.5 SCORE</small>
                    </div>

                    <div className="result-category">
                      {result.category}
                    </div>

                    <div className="result-meter">
                      <span
                        style={{
                          width: `${Math.min(
                            result.pm25 / 500 * 100,
                            100
                          )}%`
                        }}
                      />
                    </div>

                    <div className="prediction-details">

                      <p>
                        <strong>Temperature:</strong>{" "}
                        {result.temperature} °C
                      </p>

                      <p>
                        <strong>Humidity:</strong>{" "}
                        {result.humidity} %
                      </p>

                      <p>
                        <strong>Wind speed:</strong>{" "}
                        {result.windSpeed} km/h
                      </p>

                      <p>
                        <strong>Pressure:</strong>{" "}
                        {result.pressure} hPa
                      </p>

                      <p>
                        <strong>Rainfall:</strong>{" "}
                        {result.rainfall} mm
                      </p>

                    </div>

                    <p className="result-timestamp">
                      Generated: {result.generatedAt}
                    </p>

                    <button
                      className="outline-button full"
                      onClick={exportReport}
                    >
                      <Download size={16} />
                      Download report
                    </button>

                    <p className="result-disclaimer">
                      This is an illustrative demo score, not
                      an actual measured PM2.5 concentration.
                    </p>

                  </motion.div>

                ) : (

                  <div className="empty-result">

                    <div className="empty-icon">
                      <Waves size={30} />
                    </div>

                    <h4>Awaiting your inputs</h4>

                    <p>
                      Enter your weather conditions and click
                      predict to generate your demo PM2.5 score.
                    </p>

                  </div>

                )}

              </section>

            </div>

          )}


          {/* ===================================
              ANALYTICS
          =================================== */}

          {activeNav === "Analytics" && (

            <div className="analytics-grid">

              <ChartCard
                title="Temperature vs PM2.5"
                subtitle="Illustrative relationship using demo values"
                tag="RELATIONSHIP"
              >

                <ResponsiveContainer width="100%" height="100%">

                  <ScatterChart>

                    <CartesianGrid stroke="#ffffff0d" />

                    <XAxis
                      type="number"
                      dataKey="temperature"
                      name="Temperature"
                      unit="°C"
                      stroke="#77736a"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      type="number"
                      dataKey="pm25"
                      name="PM2.5"
                      stroke="#77736a"
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "#171612",
                        border: "1px solid #5a492b",
                        borderRadius: 10
                      }}
                    />

                    <Scatter
                      data={dynamicScatterData}
                      fill={GOLD}
                    />

                  </ScatterChart>

                </ResponsiveContainer>

              </ChartCard>


              <ChartCard
                title="Illustrative PM2.5 trend"
                subtitle="Comparison of sample values"
                tag="TREND"
              >

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart data={chartHistory}>

                    <CartesianGrid
                      stroke="#ffffff0d"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      stroke="#77736a"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      stroke="#77736a"
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "#171612",
                        border: "1px solid #5a492b",
                        borderRadius: 10
                      }}
                    />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Illustrative value"
                      stroke={GOLD}
                      strokeWidth={2.5}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="predicted"
                      name="Demo comparison"
                      stroke="#8b9a9a"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </ChartCard>


              <div className="panel analysis-copy">

                <div className="eyebrow">
                  STATISTICAL METHODS
                </div>

                <h3>
                  From raw observations to useful insight.
                </h3>

                <div className="method-grid">

                  <div>
                    <b>01 / CORRELATION</b>

                    <p>
                      Measure the strength and direction of
                      relationships between weather variables
                      and PM2.5.
                    </p>
                  </div>

                  <div>
                    <b>02 / MULTIPLE REGRESSION</b>

                    <p>
                      Estimate PM2.5 using several meteorological
                      variables together.
                    </p>
                  </div>

                  <div>
                    <b>03 / ERROR ANALYSIS</b>

                    <p>
                      Evaluate a trained model with MAE,
                      RMSE and R² on held-out observations.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          )}


          {/* ===================================
              FORECAST
          =================================== */}

          {activeNav === "Forecast" && (

            <div className="forecast-section">

              <div className="panel forecast-panel">

                <div className="panel-heading">

                  <div>
                    <h3>PM2.5 forecast scenario</h3>

                    <p>
                      Explore an illustrative future trend.
                    </p>
                  </div>

                  <div className="select-wrap compact-select">

                    <select
                      value={forecastDays}
                      onChange={e =>
                        setForecastDays(e.target.value)
                      }
                    >
                      <option>7 days</option>
                      <option>14 days</option>
                      <option>30 days</option>
                    </select>

                    <ChevronDown size={15} />

                  </div>

                </div>


                <div className="forecast-chart">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart data={forecastData}>

                      <defs>

                        <linearGradient
                          id="forecastFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="0%"
                            stopColor={GOLD}
                            stopOpacity={0.3}
                          />

                          <stop
                            offset="100%"
                            stopColor={GOLD}
                            stopOpacity={0}
                          />

                        </linearGradient>

                      </defs>

                      <CartesianGrid
                        stroke="#ffffff0d"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="day"
                        stroke="#77736a"
                        tickLine={false}
                        axisLine={false}
                      />

                      <YAxis
                        stroke="#77736a"
                        tickLine={false}
                        axisLine={false}
                      />

                      <Tooltip
                        contentStyle={{
                          background: "#171612",
                          border: "1px solid #5a492b",
                          borderRadius: 10
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="predicted"
                        name="Illustrative PM2.5"
                        stroke={GOLD}
                        strokeWidth={2.5}
                        fill="url(#forecastFill)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>


                <div className="forecast-legend">
                  <span className="legend-dot" />
                  Illustrative scenario values
                </div>

              </div>


              <div className="bottom-note">
                <Waves size={16} />

                <span>
                  A genuine future PM2.5 forecast requires
                  historical pollution measurements and
                  a trained time-series model.
                </span>
              </div>

            </div>

          )}


          {/* FOOTER */}

          <footer className="app-footer">

            <Brand small />

            <span>
              BUILT FOR A CLEARER VIEW OF THE AIR · 2026
            </span>

            <span>
              PROTOTYPE 02.0
            </span>

          </footer>

        </div>

      </main>


      {/* NOTIFICATION */}

      <AnimatePresence>

        {notice && (

          <motion.div
            className="toast"
            initial={{
              opacity: 0,
              y: 15
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: 10
            }}
          >

            <Check size={16} />
            {notice}

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}


// ==========================================
// MAIN APP
// ==========================================

export default function App() {
  const [email, setEmail] = useState(
    () => localStorage.getItem("aircast-email") || ""
  );

  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("aircast-profile") || "null"
      );
    } catch {
      return null;
    }
  });

  const login = value => {
    setEmail(value);
    localStorage.setItem("aircast-email", value);
  };

  const complete = value => {
    setProfile(value);

    localStorage.setItem(
      "aircast-profile",
      JSON.stringify(value)
    );
  };

  const logout = () => {
    localStorage.removeItem("aircast-email");
    localStorage.removeItem("aircast-profile");

    setEmail("");
    setProfile(null);
  };

  return (
    <>
      <GoldCursor />

      <AnimatePresence mode="wait">

        {!email ? (

          <motion.div
            key="login"
            exit={{ opacity: 0 }}
          >
            <Login onLogin={login} />
          </motion.div>

        ) : !profile ? (

          <motion.div
            key="onboarding"
            exit={{ opacity: 0 }}
          >
            <Onboarding
              email={email}
              onComplete={complete}
            />
          </motion.div>

        ) : (

          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Dashboard
              profile={profile}
              onLogout={logout}
            />
          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}