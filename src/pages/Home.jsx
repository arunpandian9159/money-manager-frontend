import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-serif bg-[#F9F8F4] text-[#0A192F] antialiased selection:bg-[#D65A31] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#0A192F]/5 bg-[#F9F8F4]/80 backdrop-blur-md">
        <div className="px-6 md:px-12 py-4 mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 text-[#0A192F]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <rect height="32" stroke="currentColor" strokeWidth="4" width="32" x="8" y="8"></rect>
                <path d="M8 40L40 8" stroke="currentColor" strokeWidth="2"></path>
                <circle cx="24" cy="24" fill="currentColor" r="6"></circle>
              </svg>
            </div>
            <h2 className="text-[#0A192F] font-display text-lg font-bold tracking-tight uppercase">Money Manager</h2>
          </div>
          <nav className="hidden md:flex items-center gap-12">
            <a className="text-[#0A192F]/70 hover:text-[#D65A31] transition-colors font-serif text-lg italic" href="#features">Features</a>
            <a className="text-[#0A192F]/70 hover:text-[#D65A31] transition-colors font-serif text-lg italic" href="#methodology">Methodology</a>
            <a className="text-[#0A192F]/70 hover:text-[#D65A31] transition-colors font-serif text-lg italic" href="#testimonial">Testimonial</a>
          </nav>
          <div className="flex gap-4 items-center">
            <Link to="/login" className="hidden sm:block font-mono text-sm text-[#0A192F] uppercase tracking-widest hover:text-[#D65A31] transition-colors">Log In</Link>
            <Link to="/register" className="bg-[#0A192F] text-white hover:bg-[#D65A31] font-mono text-xs uppercase tracking-widest px-6 py-3 transition-colors">
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
                <span className="h-[1px] w-12 bg-[#D65A31]"></span>
                <span className="font-mono text-[#D65A31] uppercase tracking-widest text-sm">Fintech Refined</span>
              </div>
              <h1 className="font-display text-[#0A192F] text-6xl sm:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
                Capitalize <br/>
                <span className="font-serif italic font-light text-5xl sm:text-6xl xl:text-7xl block mt-2 mb-2">on</span>
                Clarity
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-[#0A192F]/70 leading-relaxed max-w-xl border-l-2 border-[#81B29A] pl-6">
                A masterclass in wealth management. We blend precision engineering with editorial sophistication to give you a clear view of your capital.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <Link to="/register" className="bg-[#D65A31] text-white hover:bg-[#0A192F] font-display font-bold text-sm uppercase tracking-widest px-10 py-4 transition-all shadow-xl shadow-[#D65A31]/20 text-center">
                  Start Trial
                </Link>
                <button className="group flex items-center justify-center gap-3 font-mono text-[#0A192F] uppercase text-sm tracking-widest hover:text-[#D65A31] transition-colors">
                  <span className="border border-[#0A192F]/20 w-10 h-10 flex items-center justify-center rounded-full group-hover:border-[#D65A31] transition-colors">
                    <span className="material-symbols-outlined text-lg">play_arrow</span>
                  </span>
                  View Methodology
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[45%] relative">
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#81B29A]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-10 w-[300px] h-[300px] bg-[#D65A31]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="relative bg-white border border-[#0A192F]/10 shadow-2xl shadow-[#0A192F]/20 p-2 rounded-lg aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-[#ECEBE6]/30 rounded flex flex-col overflow-hidden">
                    <div className="h-12 border-b border-[#0A192F]/5 flex items-center px-4 justify-between bg-white">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#81B29A]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#D65A31]"></div>
                      </div>
                      <div className="font-mono text-[10px] text-[#0A192F]/40">DASHBOARD_V2.0</div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-[#F9F8F4] to-[#ECEBE6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-8xl text-[#0A192F]/10">dashboard</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-6 top-12 bg-[#0A192F] text-[#F9F8F4] p-5 shadow-xl border-l-4 border-[#D65A31] w-48">
                  <p className="font-mono text-xs text-white/50 mb-1">NET WORTH</p>
                  <p className="font-display font-bold text-xl">$1,204,500</p>
                  <div className="mt-3 h-1 w-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#81B29A] w-[70%]"></div>
                  </div>
                </div>
                <div className="absolute -left-8 bottom-12 bg-[#F9F8F4] border border-[#0A192F]/10 p-5 shadow-xl w-56">
                  <div className="flex justify-between items-end mb-2">
                    <p className="font-serif italic text-[#0A192F]">Monthly Yield</p>
                    <span className="font-mono text-xs text-[#81B29A]">+12.4%</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    <div className="w-1/5 bg-[#0A192F]/10 h-[40%]"></div>
                    <div className="w-1/5 bg-[#0A192F]/20 h-[60%]"></div>
                    <div className="w-1/5 bg-[#0A192F]/40 h-[30%]"></div>
                    <div className="w-1/5 bg-[#0A192F]/60 h-[80%]"></div>
                    <div className="w-1/5 bg-[#D65A31] h-[95%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-[#0A192F]/10 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#0A192F]/10">
            <div className="p-8 group hover:bg-[#ECEBE6] transition-colors">
              <p className="font-mono text-xs uppercase tracking-widest text-[#0A192F]/50 mb-2 group-hover:text-[#D65A31] transition-colors">Saved Weekly</p>
              <p className="font-mono text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tighter">$2.4k</p>
            </div>
            <div className="p-8 group hover:bg-[#ECEBE6] transition-colors">
              <p className="font-mono text-xs uppercase tracking-widest text-[#0A192F]/50 mb-2 group-hover:text-[#D65A31] transition-colors">Portfolio Growth</p>
              <p className="font-mono text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tighter">+28%</p>
            </div>
            <div className="p-8 group hover:bg-[#ECEBE6] transition-colors">
              <p className="font-mono text-xs uppercase tracking-widest text-[#0A192F]/50 mb-2 group-hover:text-[#D65A31] transition-colors">Active Assets</p>
              <p className="font-mono text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tighter">142</p>
            </div>
            <div className="p-8 group hover:bg-[#ECEBE6] transition-colors">
              <p className="font-mono text-xs uppercase tracking-widest text-[#0A192F]/50 mb-2 group-hover:text-[#D65A31] transition-colors">Security Level</p>
              <p className="font-mono text-4xl md:text-5xl font-bold text-[#0A192F] tracking-tighter">A++</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 bg-[#F9F8F4] px-6 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-[#0A192F]/10 pb-8">
            <div>
              <span className="font-mono text-[#D65A31] text-sm uppercase tracking-widest mb-4 block">System Capabilities</span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-[#0A192F] uppercase leading-none">
                Engineered <br/> <span className="text-[#81B29A] font-serif italic lowercase tracking-normal">for</span> Control
              </h2>
            </div>
            <p className="font-serif text-lg text-[#0A192F]/60 max-w-sm text-right md:text-left">
              Our platform combines the robustness of an institutional ledger with the fluidity of modern design.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
            <div className="md:col-span-6 lg:col-span-7 bg-white p-8 md:p-12 border border-[#0A192F]/5 shadow-sm hover:shadow-xl transition-shadow duration-500 group min-h-[400px] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-[#0A192F] text-white flex items-center justify-center group-hover:bg-[#D65A31] transition-colors">
                  <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                </div>
                <span className="font-mono text-xs text-[#0A192F]/30">01</span>
              </div>
              <div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[#0A192F] mb-4">Smart Ledger</h3>
                <p className="font-serif text-xl text-[#0A192F]/70 leading-relaxed">
                  A living document of your financial history. Unlike static spreadsheets, the Smart Ledger evolves, categorizing transactions with machine learning precision.
                </p>
              </div>
            </div>
            <div className="md:col-span-6 lg:col-span-5 bg-[#0A192F] text-[#F9F8F4] p-8 md:p-12 border border-[#0A192F]/5 shadow-sm hover:shadow-xl transition-shadow duration-500 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="w-16 h-16 bg-white/10 text-white flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-3xl">splitscreen</span>
                </div>
                <span className="font-mono text-xs text-white/30">02</span>
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Dual Division</h3>
                <p className="font-serif text-xl text-white/70 leading-relaxed">
                  Personal and Business. Two worlds, one interface. Toggle between distinct financial identities without ever logging out.
                </p>
              </div>
            </div>
            <div className="md:col-span-3 lg:col-span-4 bg-[#81B29A]/20 p-8 border border-[#81B29A]/20 hover:bg-[#81B29A]/30 transition-colors flex flex-col justify-center items-center text-center gap-4 min-h-[250px]">
              <span className="material-symbols-outlined text-5xl text-[#0A192F]">pie_chart</span>
              <h4 className="font-display font-bold text-xl text-[#0A192F] uppercase tracking-wide">Visual Analytics</h4>
            </div>
            <div className="md:col-span-3 lg:col-span-4 bg-[#D65A31]/10 p-8 border border-[#D65A31]/20 hover:bg-[#D65A31]/20 transition-colors flex flex-col justify-center items-center text-center gap-4 min-h-[250px]">
              <span className="material-symbols-outlined text-5xl text-[#D65A31]">lock_clock</span>
              <h4 className="font-display font-bold text-xl text-[#0A192F] uppercase tracking-wide">12-Hour Edit Window</h4>
            </div>
            <div className="md:col-span-6 lg:col-span-4 bg-white p-8 border border-[#0A192F]/5 flex flex-col justify-center">
              <p className="font-serif italic text-2xl text-[#0A192F] leading-tight">
                "The most intuitive way to understand where your money flows."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-[1px] w-8 bg-[#D65A31]"></span>
                <span className="font-mono text-xs uppercase tracking-widest">User Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-32 bg-[#ECEBE6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0A192F 1px, transparent 1px), linear-gradient(90deg, #0A192F 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <h2 className="text-center font-display text-4xl md:text-5xl font-bold text-[#0A192F] mb-24 uppercase">The Methodology</h2>
          <div className="space-y-16">
            {[
              { phase: '01', title: 'Aggregation', desc: 'Connect all your accounts to build a complete picture of your liquid and illiquid assets in seconds.', color: '#0A192F' },
              { phase: '02', title: 'Segmentation', desc: 'Your transactions are automatically filtered into categories, separating essential capital from discretionary spending.', color: '#D65A31' },
              { phase: '03', title: 'Projection', desc: 'Using predictive models, we forecast your net worth trajectory based on current habits.', color: '#81B29A' }
            ].map((item, index) => (
              <div key={item.phase} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
                <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="font-mono text-[#D65A31] text-sm mb-2">PHASE {item.phase}</div>
                  <h3 className="font-display text-3xl font-bold text-[#0A192F] mb-4">{item.title}</h3>
                  <p className="font-serif text-lg text-[#0A192F]/70 max-w-sm">{item.desc}</p>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-4 h-4 rotate-45" style={{ backgroundColor: item.color }}></div>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonial" className="py-32 px-6 bg-white border-y border-[#0A192F]/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="material-symbols-outlined text-6xl text-[#D65A31]/20 mb-8">format_quote</span>
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0A192F] italic leading-tight mb-12">
            "Money Manager isn't just a budgeting tool; it is a piece of financial architecture that forces you to respect your own wealth."
          </blockquote>
          <div className="flex flex-col items-center gap-2">
            <cite className="font-display font-bold text-[#0A192F] text-lg not-italic uppercase tracking-widest">The Financial Review</cite>
            <span className="font-mono text-sm text-[#0A192F]/40">Quarterly Issue, 2023</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-[#F9F8F4] pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <svg className="size-8 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <rect height="32" stroke="currentColor" strokeWidth="4" width="32" x="8" y="8"></rect>
                  <path d="M8 40L40 8" stroke="currentColor" strokeWidth="2"></path>
                  <circle cx="24" cy="24" fill="currentColor" r="6"></circle>
                </svg>
                <span className="font-display font-bold text-xl uppercase tracking-widest">Money Manager</span>
              </div>
              <p className="font-serif text-white/60 text-lg mb-8">
                The definitive operating system for personal and commercial capital.
              </p>
              <Link to="/register" className="inline-block bg-[#D65A31] hover:bg-white hover:text-[#0A192F] text-white font-mono text-xs uppercase tracking-widest px-6 py-3 transition-colors">
                Get App
              </Link>
            </div>
            <div>
              <h4 className="font-mono text-[#D65A31] text-xs uppercase tracking-widest mb-6">Platform</h4>
              <ul className="space-y-4 font-serif text-lg text-white/70">
                <li><a className="hover:text-white hover:italic transition-all" href="#features">Features</a></li>
                <li><a className="hover:text-white hover:italic transition-all" href="#">Security</a></li>
                <li><a className="hover:text-white hover:italic transition-all" href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[#D65A31] text-xs uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 font-serif text-lg text-white/70">
                <li><a className="hover:text-white hover:italic transition-all" href="#">About</a></li>
                <li><a className="hover:text-white hover:italic transition-all" href="#">Careers</a></li>
                <li><a className="hover:text-white hover:italic transition-all" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[#D65A31] text-xs uppercase tracking-widest mb-6">Connect</h4>
              <div className="flex gap-4 text-white/70">
                <a className="hover:text-white transition-colors" href="#">Twitter</a>
                <span className="text-white/20">/</span>
                <a className="hover:text-white transition-colors" href="#">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest">© 2024 Money Manager Inc.</p>
            <div className="flex gap-8 font-mono text-xs text-white/40 uppercase tracking-widest">
              <a className="hover:text-white transition-colors" href="#">Privacy</a>
              <a className="hover:text-white transition-colors" href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

