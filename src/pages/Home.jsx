import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-serif bg-background-light text-secondary antialiased selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-secondary/5 bg-background-light/80 backdrop-blur-md">
        <div className="px-6 md:px-12 py-4 mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 text-secondary">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  height="32"
                  stroke="currentColor"
                  strokeWidth="4"
                  width="32"
                  x="8"
                  y="8"
                ></rect>
                <path
                  d="M8 40L40 8"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
                <circle cx="24" cy="24" fill="currentColor" r="6"></circle>
              </svg>
            </div>
            <h2 className="text-secondary font-bold text-lg tracking-tight uppercase">
              Money Manager
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-12">
            <a
              className="text-secondary/70 hover:text-primary transition-colors font-serif text-lg italic"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-secondary/70 hover:text-primary transition-colors font-serif text-lg italic"
              href="#methodology"
            >
              Methodology
            </a>
            <a
              className="text-secondary/70 hover:text-primary transition-colors font-serif text-lg italic"
              href="#testimonial"
            >
              Testimonial
            </a>
          </nav>
          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="hidden sm:block font-mono text-xs text-secondary uppercase tracking-widest hover:text-primary transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-secondary text-background-light hover:bg-primary font-mono text-[10px] uppercase tracking-widest px-6 py-3 transition-colors"
            >
              Get Access
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40 px-6 md:px-12 overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="w-full lg:w-[55%] flex flex-col gap-8 relative z-10">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-primary"></span>
                <span className="font-mono text-primary uppercase tracking-widest text-[10px] font-bold">
                  Fintech Refined
                </span>
              </div>
              <h1 className="text-secondary dark:text-background-light text-6xl sm:text-7xl xl:text-8xl font-bold uppercase leading-[0.9] tracking-tighter">
                Capitalize <br />
                <span className="font-serif italic font-light lowercase text-5xl sm:text-6xl xl:text-7xl block mt-4 mb-4 tracking-normal">
                  on
                </span>
                Clarity
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-secondary/70 dark:text-background-light/70 leading-relaxed max-w-xl border-l border-accent pl-8 py-2">
                A masterclass in wealth management. We blend precision
                engineering with editorial sophistication to give you a clear
                view of your capital.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <Link
                  to="/register"
                  className="bg-primary text-white hover:bg-secondary font-bold text-xs uppercase tracking-[0.2em] px-10 py-5 transition-all shadow-xl shadow-primary/20 text-center"
                >
                  Initialize Trial
                </Link>
                <button className="group flex items-center justify-center gap-4 font-mono text-secondary uppercase text-[10px] tracking-widest hover:text-primary transition-colors">
                  <span className="border border-secondary/10 w-12 h-12 flex items-center justify-center rounded-none group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      play_arrow
                    </span>
                  </span>
                  Technical Methodology
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[45%] relative">
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-10 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="relative bg-white dark:bg-white/5 border border-secondary/5 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1)] p-2 rounded-none aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-background-alt/30 rounded-none flex flex-col overflow-hidden">
                    <div className="h-12 border-b border-secondary/5 flex items-center px-4 justify-between bg-white dark:bg-secondary">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-none bg-accent"></div>
                        <div className="w-2 h-2 rounded-none bg-primary"></div>
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-secondary/30">
                        ENV_DASHBOARD_V2
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-background-light to-background-alt flex items-center justify-center">
                      <span className="material-symbols-outlined text-8xl text-secondary/5">
                        dashboard
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-6 top-12 bg-secondary text-background-light p-6 shadow-2xl border-l border-primary w-52">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                    NET ASSET VALUE
                  </p>
                  <p className="font-serif italic text-2xl tracking-tight">
                    $1,204,500
                  </p>
                  <div className="mt-4 h-[1px] w-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-accent w-[70%]"></div>
                  </div>
                </div>
                <div className="absolute -left-8 bottom-12 bg-background-light border border-secondary/5 p-6 shadow-2xl w-60">
                  <div className="flex justify-between items-end mb-4">
                    <p className="font-serif italic text-secondary text-lg">
                      Yield Meta
                    </p>
                    <span className="font-mono text-[10px] text-accent font-bold">
                      +12.4%
                    </span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    <div className="w-full bg-secondary/5 h-[40%]"></div>
                    <div className="w-full bg-secondary/10 h-[60%]"></div>
                    <div className="w-full bg-secondary/20 h-[30%]"></div>
                    <div className="w-full bg-secondary/30 h-[80%]"></div>
                    <div className="w-full bg-primary h-[95%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-secondary/5 bg-white dark:bg-transparent">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-secondary/5">
            <div className="p-10 group hover:bg-background-alt transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 mb-3 group-hover:text-primary transition-colors">
                SAVED_WEEKLY
              </p>
              <p className="font-serif italic text-5xl text-secondary group-hover:translate-x-1 transition-transform tracking-tighter">
                $2.4k
              </p>
            </div>
            <div className="p-10 group hover:bg-background-alt transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 mb-3 group-hover:text-primary transition-colors">
                PORTFOLIO_DELTA
              </p>
              <p className="font-serif italic text-5xl text-secondary group-hover:translate-x-1 transition-transform tracking-tighter">
                +28%
              </p>
            </div>
            <div className="p-10 group hover:bg-background-alt transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 mb-3 group-hover:text-primary transition-colors">
                ACTIVE_INSTANCES
              </p>
              <p className="font-serif italic text-5xl text-secondary group-hover:translate-x-1 transition-transform tracking-tighter">
                142
              </p>
            </div>
            <div className="p-10 group hover:bg-background-alt transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary/40 mb-3 group-hover:text-primary transition-colors">
                TRUST_RATING
              </p>
              <p className="font-serif italic text-5xl text-secondary group-hover:translate-x-1 transition-transform tracking-tighter">
                A++
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 md:py-32 bg-background-light px-6 md:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-secondary/5 pb-12">
            <div>
              <span className="font-mono text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">
                System Capabilities
              </span>
              <h2 className="font-bold text-4xl md:text-6xl text-secondary dark:text-background-light uppercase tracking-tighter leading-none">
                Engineered <br />{" "}
                <span className="text-accent font-serif italic lowercase tracking-normal font-light">
                  for
                </span>{" "}
                Absolute Control
              </h2>
            </div>
            <p className="font-serif text-lg text-secondary/60 dark:text-background-light/60 max-w-sm text-right md:text-left leading-relaxed">
              Our platform combines the robustness of an institutional ledger
              with the fluidity of modern design.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
            <div className="md:col-span-6 lg:col-span-7 bg-white dark:bg-white/5 p-12 md:p-16 border border-secondary/5 hover:shadow-2xl transition-all duration-500 group min-h-[450px] flex flex-col justify-between rounded-none">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-secondary text-background-light flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-2xl">
                    account_balance_wallet
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold text-secondary/20">
                  INSTANCE_01
                </span>
              </div>
              <div>
                <h3 className="font-bold text-3xl md:text-4xl text-secondary dark:text-background-light mb-6 uppercase tracking-tight">
                  Smart Ledger
                </h3>
                <p className="font-serif text-xl text-secondary/70 dark:text-background-light/70 leading-relaxed">
                  A living document of your financial history. Unlike static
                  spreadsheets, the Smart Ledger evolves, categorizing
                  transactions with machine learning precision.
                </p>
              </div>
            </div>
            <div className="md:col-span-6 lg:col-span-5 bg-secondary text-background-light p-12 md:p-16 border border-secondary/5 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between relative overflow-hidden rounded-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-40 -mt-40"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="w-16 h-16 bg-white/10 text-white flex items-center justify-center backdrop-blur-sm border border-white/5">
                  <span className="material-symbols-outlined text-2xl">
                    splitscreen
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold text-white/20">
                  INSTANCE_02
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-3xl md:text-4xl text-white mb-6 uppercase tracking-tight">
                  Dual Division
                </h3>
                <p className="font-serif text-xl text-white/70 leading-relaxed">
                  Personal and Business. Two worlds, one interface. Toggle
                  between distinct financial identities without ever logging
                  out.
                </p>
              </div>
            </div>
            <div className="md:col-span-3 lg:col-span-4 bg-accent/10 p-12 border border-accent/20 hover:bg-accent/20 transition-colors flex flex-col justify-center items-center text-center gap-6 min-h-[280px]">
              <span className="material-symbols-outlined text-4xl text-secondary">
                pie_chart
              </span>
              <h4 className="font-mono font-bold text-xs text-secondary uppercase tracking-[0.2em]">
                Visual Analytics
              </h4>
            </div>
            <div className="md:col-span-3 lg:col-span-4 bg-primary/5 p-12 border border-primary/10 hover:bg-primary/10 transition-colors flex flex-col justify-center items-center text-center gap-6 min-h-[280px]">
              <span className="material-symbols-outlined text-4xl text-primary">
                lock_clock
              </span>
              <h4 className="font-mono font-bold text-xs text-secondary uppercase tracking-[0.2em]">
                Edit Protocols
              </h4>
            </div>
            <div className="md:col-span-6 lg:col-span-4 bg-white dark:bg-white/5 p-12 border border-secondary/5 flex flex-col justify-center">
              <p className="font-serif italic text-2xl text-secondary dark:text-background-light leading-tight">
                "The most intuitive way to understand where your money flows."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="h-[1px] w-8 bg-primary"></span>
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-secondary/40">
                  User Intelligence
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section
        id="methodology"
        className="py-32 bg-background-alt relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--secondary) 1px, transparent 1px), linear-gradient(90deg, var(--secondary) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="flex flex-col items-center mb-24">
            <span className="font-mono text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Structural Sequence
            </span>
            <h2 className="text-center font-bold text-4xl md:text-5xl text-secondary uppercase tracking-tighter">
              The Methodology
            </h2>
          </div>
          <div className="space-y-24">
            {[
              {
                phase: "01",
                title: "Aggregation",
                desc: "Connect all your accounts to build a complete picture of your liquid and illiquid assets in seconds.",
                color: "var(--secondary)",
              },
              {
                phase: "02",
                title: "Segmentation",
                desc: "Your transactions are automatically filtered into categories, separating essential capital from discretionary spending.",
                color: "var(--primary)",
              },
              {
                phase: "03",
                title: "Projection",
                desc: "Using predictive models, we forecast your net worth trajectory based on current habits.",
                color: "var(--accent)",
              },
            ].map((item, index) => (
              <div
                key={item.phase}
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 group`}
              >
                <div
                  className={`md:w-1/2 ${index % 2 === 1 ? "md:text-left" : "md:text-right"}`}
                >
                  <div className="font-mono text-primary text-[10px] font-bold mb-4 tracking-widest uppercase">
                    PHASE_{item.phase}
                  </div>
                  <h3 className="font-bold text-3xl text-secondary mb-6 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-serif text-lg text-secondary/70 max-w-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="flex justify-center items-center relative">
                  <div className="absolute inset-0 bg-white/20 blur-xl group-hover:scale-150 transition-transform"></div>
                  <div
                    className="w-4 h-4 rotate-45 relative z-10 group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        id="testimonial"
        className="py-32 px-6 bg-white dark:bg-transparent border-y border-secondary/5"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="material-symbols-outlined text-6xl text-primary/10 mb-8">
            format_quote
          </span>
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary dark:text-background-light italic leading-tight mb-12">
            "Money Manager isn't just a budgeting tool; it is a piece of
            financial architecture that forces you to respect your own wealth."
          </blockquote>
          <div className="flex flex-col items-center gap-2">
            <cite className="font-bold text-secondary dark:text-background-light text-lg not-italic uppercase tracking-[0.2em]">
              The Financial Review
            </cite>
            <span className="font-mono text-[10px] text-secondary/40 font-bold tracking-widest uppercase">
              Quarterly Issue_2024
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-background-light pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4 mb-10">
                <svg
                  className="size-8 text-white"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    height="32"
                    stroke="currentColor"
                    strokeWidth="4"
                    width="32"
                    x="8"
                    y="8"
                  ></rect>
                  <path
                    d="M8 40L40 8"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></path>
                  <circle cx="24" cy="24" fill="currentColor" r="6"></circle>
                </svg>
                <span className="font-bold text-xl uppercase tracking-[0.2em]">
                  Money Manager
                </span>
              </div>
              <p className="font-serif text-white/60 text-lg mb-10 leading-relaxed">
                The definitive operating system for personal and commercial
                capital. engineered for total visibility.
              </p>
              <Link
                to="/register"
                className="inline-block bg-primary hover:bg-white hover:text-secondary text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 transition-all"
              >
                Access Terminal
              </Link>
            </div>
            <div>
              <h4 className="font-mono text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                Capabilities
              </h4>
              <ul className="space-y-4 font-serif text-lg text-white/50">
                <li>
                  <a
                    className="hover:text-white hover:italic transition-all"
                    href="#features"
                  >
                    Smart Ledger
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white hover:italic transition-all"
                    href="#"
                  >
                    Institutional Security
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white hover:italic transition-all"
                    href="#"
                  >
                    Capital Projections
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                Identity
              </h4>
              <ul className="space-y-4 font-serif text-lg text-white/50">
                <li>
                  <a
                    className="hover:text-white hover:italic transition-all"
                    href="#"
                  >
                    About The Mint
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white hover:italic transition-all"
                    href="#"
                  >
                    Career Directives
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white hover:italic transition-all"
                    href="#"
                  >
                    Public Relations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                Network
              </h4>
              <div className="flex flex-col gap-4 font-serif text-lg text-white/50">
                <a
                  className="hover:text-white hover:italic transition-all"
                  href="#"
                >
                  X.com / Terminal
                </a>
                <a
                  className="hover:text-white hover:italic transition-all"
                  href="#"
                >
                  LinkedIn / Network
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">
              © 2024 Money Manager Institutional. All Rights Reserved.
            </p>
            <div className="flex gap-12 font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">
              <a className="hover:text-white transition-colors" href="#">
                Privacy Directive
              </a>
              <a className="hover:text-white transition-colors" href="#">
                Service Protocol
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
