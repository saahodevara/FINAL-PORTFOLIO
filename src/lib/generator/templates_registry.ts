export const TEMPLATE_REGISTRY = [
    {
        id: 'minimal-clean-1',
        category: 'Employee',
        variation: 'Minimal Clean',
        hasPhoto: false,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <meta name="description" content="{{SEO_DESC}}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">{{JSON_LD}}</script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-white text-slate-900 selection:bg-black selection:text-white">
    <nav class="max-w-4xl mx-auto px-6 py-12 flex justify-between items-center">
        <span class="font-bold tracking-tighter text-xl">{{NAME}}</span>
        <div class="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#work" class="hover:text-black transition-colors">Work</a>
            <a href="#about" class="hover:text-black transition-colors">About</a>
            <a href="mailto:{{EMAIL}}" class="hover:text-black transition-colors">Contact</a>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6">
        <header class="py-24">
            <h1 class="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                {{TITLE}}
            </h1>
            <p class="text-2xl text-slate-500 font-light max-w-2xl leading-relaxed">
                {{BIO}}
            </p>
        </header>

        <section id="work" class="py-24 border-t border-slate-100">
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">Selected Projects</h2>
            <div class="space-y-32">
                {{#PROJECTS}}
                <article class="group cursor-pointer">
                    <div class="aspect-video bg-slate-50 overflow-hidden mb-8">
                        <img src="{{PROJ_IMG}}" alt="{{PROJ_NAME}}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
                    </div>
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-3xl font-bold mb-2">{{PROJ_NAME}}</h3>
                            <p class="text-slate-500 mb-4 max-w-xl">{{PROJ_DESC}}</p>
                            <div class="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                {{PROJ_TAGS}}
                            </div>
                        </div>
                    </div>
                </article>
                {{/PROJECTS}}
            </div>
        </section>

        <section id="about" class="py-24 border-t border-slate-100">
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-12">Background</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                     {{#EXPERIENCES}}
                     <div class="mb-12">
                        <span class="text-[10px] font-bold text-slate-400 block mb-2">{{EXP_DURATION}}</span>
                        <h3 class="text-xl font-bold mb-1">{{EXP_ROLE}}</h3>
                        <p class="text-sm font-bold text-slate-900 mb-3">@ {{EXP_COMPANY}}</p>
                        <p class="text-sm text-slate-500 leading-relaxed">{{EXP_DESC}}</p>
                     </div>
                     {{/EXPERIENCES}}
                </div>
                <div class="space-y-8">
                    <div class="p-8 bg-slate-50 rounded-2xl">
                        <h4 class="font-bold mb-4">Contact Protocol</h4>
                        <div class="space-y-4 text-sm">
                            <a href="mailto:{{EMAIL}}" class="block hover:underline">{{EMAIL}}</a>
                            <a href="{{LINKEDIN}}" class="block hover:underline">LinkedIn</a>
                            <a href="{{GITHUB}}" class="block hover:underline">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="py-24 border-t border-slate-100 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
        &copy; {{NAME}} — Built with Portfoli AI
    </footer>
</body>
</html>`
            }
        ]
    },
    {
        id: 'bento-dark-1',
        category: 'Business',
        variation: 'Bento Projects Grid',
        hasPhoto: true,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <meta name="description" content="{{SEO_DESC}}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">{{JSON_LD}}</script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #080808; color: white; }
    </style>
</head>
<body class="selection:bg-white selection:text-black">
    <div class="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none"></div>
    
    <nav class="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 py-4">
        <div class="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <span class="font-black text-2xl tracking-tighter uppercase italic">{{NAME}}</span>
            <button class="px-6 py-2 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                Let's Talk
            </button>
        </div>
    </nav>

    <main class="max-w-6xl mx-auto px-6 pt-24">
        <section class="mb-32">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/40 uppercase tracking-widest mb-8">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {{TITLE}}
            </div>
            <h1 class="text-6xl md:text-9xl font-extrabold tracking-tighter uppercase leading-[0.9] mb-12">
                We Build <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white/10">Value.</span>
            </h1>
            <p class="text-xl md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed mb-12">
                {{BIO}}
            </p>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-32">
            {{#PROJECTS}}
            <div class="group relative aspect-square bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-500">
                <img src="{{PROJ_IMG}}" alt="{{PROJ_NAME}}" class="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                    <h3 class="text-2xl font-bold mb-2">{{PROJ_NAME}}</h3>
                    <p class="text-white/40 text-xs font-bold uppercase tracking-widest">{{PROJ_TAGS}}</p>
                </div>
            </div>
            {{/PROJECTS}}
        </section>

        <section class="bg-white text-black p-12 md:p-24 rounded-[4rem] mb-32">
             <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic leading-none">
                Our <br/>Strategy.
             </h2>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {{#EXPERIENCES}}
                 <div class="border-t border-black/10 pt-8">
                    <h3 class="text-2xl font-bold mb-4 uppercase">{{EXP_ROLE}}</h3>
                    <p class="text-black/60 font-medium">{{EXP_DESC}}</p>
                 </div>
                 {{/EXPERIENCES}}
             </div>
        </section>
    </main>

    <footer class="py-24 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
        {{NAME}} &mdash; ALL RIGHTS RESERVED
    </footer>
</body>
</html>`
            }
        ]
    },
    {
        id: 'editorial-light-1',
        category: 'Employee',
        variation: 'Editorial',
        hasPhoto: true,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <meta name="description" content="{{SEO_DESC}}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">{{JSON_LD}}</script>
    <style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600&display=swap');
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Playfair Display', serif; }</style>
</head>
<body class="bg-[#fdfcf9] text-[#1a1a1a]">
    <div class="max-w-screen-xl mx-auto px-8 py-20">
        <header class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-40">
            <h1 class="text-8xl md:text-[10rem] leading-[0.8] tracking-tighter">The <br/>{{NAME}} <br/>Archive.</h1>
            <div class="space-y-8">
                <p class="text-2xl italic opacity-60 font-serif">{{TITLE}}</p>
                <p class="text-xl leading-relaxed">{{BIO}}</p>
            </div>
        </header>
        <section class="columns-1 md:columns-2 gap-20 space-y-20">
            {{#PROJECTS}}
            <div class="break-inside-avoid">
                <img src="{{PROJ_IMG}}" class="w-full mb-8" alt="{{PROJ_NAME}}">
                <h3 class="text-4xl mb-4">{{PROJ_NAME}}</h3>
                <p class="opacity-60 text-sm leading-relaxed mb-6">{{PROJ_DESC}}</p>
                <div class="text-[10px] uppercase font-bold tracking-widest">{{PROJ_TAGS}}</div>
            </div>
            {{/PROJECTS}}
        </section>
    </div>
</body>
</html>`
            }
        ]
    },
    {
        id: 'brutalist-1',
        category: 'Employee',
        variation: 'Neo-Brutalism',
        hasPhoto: false,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <meta name="description" content="{{SEO_DESC}}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">{{JSON_LD}}</script>
    <style>body { background: #ff5c00; font-family: 'Courier New', monospace; }</style>
</head>
<body class="p-4 md:p-10">
    <div class="border-[4px] border-black bg-white p-8 md:p-16 shadow-[12px_12px_0_0_#000]">
        <header class="border-b-[4px] border-black pb-12 mb-12">
            <h1 class="text-6xl md:text-9xl font-black uppercase tracking-tighter">{{NAME}}</h1>
            <p class="text-2xl font-bold mt-4 uppercase bg-black text-white inline-block px-4">{{TITLE}}</p>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
                <h2 class="text-3xl font-black uppercase mb-8 border-b-[2px] border-black">History.txt</h2>
                {{#EXPERIENCES}}
                <div class="mb-8 p-4 border-[2px] border-black">
                    <p class="font-bold underline">{{EXP_ROLE}} @ {{EXP_COMPANY}}</p>
                    <p class="text-sm mt-2">{{EXP_DESC}}</p>
                </div>
                {{/EXPERIENCES}}
            </section>
            <section>
                <h2 class="text-3xl font-black uppercase mb-8 border-b-[2px] border-black">Projects.zip</h2>
                {{#PROJECTS}}
                <div class="mb-4 font-bold">
                    <p>> {{PROJ_NAME}}</p>
                    <p class="text-xs opacity-60 ml-4">{{PROJ_TAGS}}</p>
                </div>
                {{/PROJECTS}}
            </section>
        </div>
    </div>
</body>
</html>`
            }
        ]
    },
    {
        id: 'glass-business-1',
        category: 'Business',
        variation: 'Glassmorphism',
        hasPhoto: true,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <meta name="description" content="{{SEO_DESC}}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">{{JSON_LD}}</script>
    <style>body { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: white; min-height: 100vh; overflow-x: hidden; }</style>
</head>
<body class="p-4 md:p-12 selection:bg-cyan-500">
    <div class="max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-20 shadow-2xl relative">
        <div class="absolute -top-20 -left-20 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full"></div>
        <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full"></div>
        
        <header class="mb-24 relative">
            <h1 class="text-5xl md:text-8xl font-black mb-6 tracking-tighter">{{NAME}}</h1>
            <p class="text-xl md:text-2xl text-cyan-400 font-bold uppercase tracking-widest">{{TITLE}}</p>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {{#PROJECTS}}
            <div class="group bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all duration-500">
                <h3 class="text-3xl font-bold mb-3">{{PROJ_NAME}}</h3>
                <p class="text-white/50 leading-relaxed mb-6">{{PROJ_DESC}}</p>
                <div class="flex flex-wrap gap-2">
                    <span class="text-[10px] px-3 py-1 bg-white/10 rounded-full font-bold uppercase">{{PROJ_TAGS}}</span>
                </div>
            </div>
            {{/PROJECTS}}
        </section>

        <footer class="text-center pt-20 border-t border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
            &copy; 2026 // {{NAME}} // ESTABLISHED VIA PORTFOLI AI
        </footer>
    </div>
</body>
</html>`
            }
        ]
    },
    {
        id: 'terminal-1',
        category: 'Employee',
        variation: 'Animation Heavy',
        hasPhoto: false,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <meta name="description" content="{{SEO_DESC}}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">{{JSON_LD}}</script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');
        body { background: #000; color: #0f0; font-family: 'Fira Code', monospace; }
        .cursor { display: inline-block; width: 10px; height: 1.2em; background: #0f0; animation: blink 1s infinite; vertical-align: middle; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .line { border-left: 2px solid #0f02; padding-left: 20px; margin-left: 10px; }
    </style>
</head>
<body class="p-6 md:p-20 selection:bg-[#0f0] selection:text-black">
    <header class="mb-20">
        <p class="text-xs opacity-40 mb-2">bash --version 5.1.16</p>
        <h1 class="text-3xl md:text-5xl font-bold mb-4">root@{{NAME.toLowerCase().replace(/\s+/g, '-')}}:~# whoami</h1>
        <p class="text-xl md:text-2xl text-white">{{TITLE}} <span class="cursor"></span></p>
    </header>

    <main class="space-y-12">
        <section>
            <h2 class="text-lg font-bold mb-4 opacity-40">[01] --PROFILE</h2>
            <div class="line">
                <p class="text-white leading-relaxed max-w-2xl">{{BIO}}</p>
            </div>
        </section>

        <section>
            <h2 class="text-lg font-bold mb-4 opacity-40">[02] --EXP</h2>
            <div class="line space-y-8">
                {{#EXPERIENCES}}
                <div>
                    <p class="text-white font-bold">>> {{EXP_ROLE}} @ {{EXP_COMPANY}}</p>
                    <p class="text-xs opacity-60">[{{EXP_DURATION}}]</p>
                    <p class="mt-2 text-sm opacity-80">{{EXP_DESC}}</p>
                </div>
                {{/EXPERIENCES}}
            </div>
        </section>

        <section>
            <h2 class="text-lg font-bold mb-4 opacity-40">[03] --PROJECTS</h2>
            <div class="line grid grid-cols-1 md:grid-cols-2 gap-8">
                {{#PROJECTS}}
                <div class="border border-[#0f0] p-4 hover:bg-[#0f0] hover:text-black transition-colors group">
                    <p class="font-bold">./{{PROJ_NAME.toLowerCase().replace(/\s+/g, '_')}}</p>
                    <p class="text-xs mt-2 opacity-60 group-hover:text-black">{{PROJ_DESC}}</p>
                    <p class="text-[10px] mt-4 font-bold">{{PROJ_TAGS}}</p>
                </div>
                {{/PROJECTS}}
            </div>
        </section>
    </main>

    <footer class="mt-32 opacity-20 text-[10px]">
        PORTFOLI_AI_EXPORT_v1.0.0_STABLE
    </footer>
</body>
</html>`
            }
        ]
    },
    {
        id: 'personal-voice-1',
        category: 'Personal Brand',
        variation: 'Minimalist',
        hasPhoto: true,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>body { background: #fff1f2; font-family: sans-serif; }</style>
</head>
<body class="p-8 md:p-32">
    <div class="max-w-3xl mx-auto">
        <nav class="mb-24 flex items-center justify-between">
            <span class="font-serif italic text-2xl uppercase tracking-tighter">{{NAME}}</span>
            <span class="text-xs font-bold opacity-30 italic">Vol. 01</span>
        </nav>
        <h1 class="text-5xl md:text-7xl font-light mb-12 leading-tight">"{{BIO}}"</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
            {{#EXPERIENCES}}
            <div class="border-t border-black/5 pt-8">
                <p class="font-medium text-lg mb-2">{{EXP_ROLE}}</p>
                <p class="text-sm opacity-60">{{EXP_DESC}}</p>
            </div>
            {{/EXPERIENCES}}
        </div>
    </div>
</body>
</html>`
            }
        ]
    },
    {
        id: 'agency-cards-1',
        category: 'Freelance',
        variation: 'Cards',
        hasPhoto: true,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white font-mono p-4">
    <div class="max-w-6xl mx-auto py-20">
        <h1 class="text-4xl font-bold mb-20">[ SERVICES_AVAILABLE ]</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {{#PROJECTS}}
            <div class="p-8 border border-white/10 hover:bg-white hover:text-black transition-all group">
                <span class="text-[10px] opacity-40 group-hover:text-black/40"># {{PROJ_TAGS}}</span>
                <h3 class="text-xl font-bold mt-4 mb-4 underline">{{PROJ_NAME}}</h3>
                <p class="text-sm opacity-60 group-hover:text-black/60">{{PROJ_DESC}}</p>
            </div>
            {{/PROJECTS}}
        </div>
    </div>
</body>
</html>`
            }
        ]
    },
    {
        id: 'intern-clean-1',
        category: 'Internship',
        variation: 'Timeline Resume',
        hasPhoto: false,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-800 p-8 md:p-16">
    <div class="max-w-3xl mx-auto border-t-8 border-blue-600 pt-12">
        <h1 class="text-4xl font-bold mb-2 tracking-tight">{{NAME}}</h1>
        <p class="text-blue-600 font-bold mb-12">{{TITLE}}</p>
        <section class="mb-12">
            <h2 class="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Objective</h2>
            <p class="text-lg leading-relaxed">{{BIO}}</p>
        </section>
        <section class="space-y-8">
            <h2 class="text-sm font-bold uppercase tracking-widest text-gray-400">Experience</h2>
            {{#EXPERIENCES}}
            <div class="flex flex-col md:flex-row gap-4">
                <span class="w-32 text-xs font-bold text-gray-400">{{EXP_DURATION}}</span>
                <div>
                    <h3 class="font-bold text-gray-900">{{EXP_ROLE}}</h3>
                    <p class="text-sm text-gray-600 mb-2">{{EXP_COMPANY}}</p>
                    <p class="text-sm text-gray-500 leading-relaxed">{{EXP_DESC}}</p>
                </div>
            </div>
            {{/EXPERIENCES}}
        </section>
    </div>
</body>
</html>`
            }
        ]
    },
    {
        id: 'founder-minimal-1',
        category: 'Founder',
        variation: 'Minimal Clean',
        hasPhoto: true,
        files: [
            {
                path: 'index.html',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{SEO_TITLE}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>body { background: #111; color: white; }</style>
</head>
<body class="flex items-center justify-center min-h-screen p-8">
    <div class="max-w-2xl text-center">
        <h1 class="text-5xl font-bold mb-8 leading-tight tracking-tighter">{{NAME}}</h1>
        <p class="text-xl text-white/40 mb-12 font-medium leading-relaxed italic">"{{BIO}}"</p>
        <div class="flex justify-center gap-8 lowercase text-sm font-mono opacity-20">
            <a href="mailto:{{EMAIL}}">mail</a>
            <a href="{{TWITTER}}">tw</a>
            <a href="{{LINKEDIN}}">li</a>
        </div>
    </div>
</body>
</html>`
            }
        ]
    }
];
