import Hero from './components/Hero'
import ScrollingStrip from './components/ScrollingStrip'
import CellularAutomaton from './components/CellularAutomaton'

export default function App() {
  return (
    <div className="computing-container">
      <Hero />
      <blockquote>
        “In conceptual art the idea or concept is the most important aspect of the work. When an artist uses a conceptual form of art, it means that all of the planning and decisions are made beforehand and the execution is a perfunctory affair. The <strong>idea becomes a machine that makes the art</strong>.”<br />
        — Sol LeWitt, 1967
      </blockquote>

      <blockquote>
        “Classical music, like classical architecture, like many other classical forms, specifies an entity in advance and then builds it. Generative music doesn't do that - it <strong>specifies a set of rules and then lets them make the thing</strong>.”<br />
        —Brian Eno, 1996
      </blockquote>

      <p>As a “computer person” I’ve long appreciated an aesthetic behind Sol LeWitt and Brian Eno because—even if they didn’t use the terminology—I always understood them to be pursuing creative computing. Both emphasized the rules that <em>generate a work</em> above the outputs themselves, and both sought to find compact rules that yield complex results. That same sensibility lives in software engineers: pursue expressive elegance in the specification, not just the resulting artifact.</p>

      <p>LeWitt’s intuition—to express ideas as executable instructions, and to understand those instructions as equivalent to the <em>output</em> under deterministic execution—maps directly onto programming. When he said “the idea becomes a machine that makes the art” in 1967 it probably read as a high-brow provocation, but to a software engineer in 2025 it’s common sense: when a statement is crisp enough, it runs. Revisiting LeWitt today feels relevant because he was not only making the point that language could reproduce an artifact, but that <strong>the statement itself</strong> is a first-class creative object worth investigating.</p>

      <p>Because LLMs are getting good at programming, the cost of going from statement to execution is collapsing. Ideas described in natural language can plausibly become generation machines without too much manual intervention. LLMs and tool‑using agents compact the programming loop by taking natural‑language intent and producing runnable programs. The significance of a language shell over computing is that it is a paradigmatic intervention that alters who can participate, how they think, and what they can reliably produce.</p>

      <p>When humans don't have to carefully translate every idea into code, ideas become the machine that makes anything you can specify. Early personal‑computing pioneers were right about the profound generality of computing. They went around making the case that the only limit outside of memory and speed is the imagination and because of that, personal-computing would usher in a grand era of bottoms-up creative and intellectual production. This didn't happen quite to the degree they imagined because the limit turns out not to be our imagination, but our <strong>understanding</strong> of the things we imagine—i.e. the ability to tease an idea apart into components and to specify those components rigorously.</p>

      <p>The computer programming loop (<strong>imagine → formalize → simulate → observe → refine</strong>) has been extraordinarily productive because <strong>simulation</strong> is fast and feedback is unambiguous. The bottleneck has mostly been in <strong>formalization</strong>—organizing and codifying an idea. Most people neither have the skill nor the time to do this translation, which is why the minority who can do it have been the only ones “making machines of their ideas”. But the on‑ramp to programming is constantly widening while the productivity loop streamlines. This is because 1) higher levels of the abstraction stack are accessible after lower ones are established, and 2) developers create “dev-tooling” which bolster the quality and durability of code as it's produced. We are living through a vibrant civilizational knowledge project to construct a global repository of executable code, and we've already formalized a staggering number of ideas.</p>

      <p>To get a visceral sense for just how much we have collectively built, and therefore a sense for how much we demonstrably understand, look at the history of video games. Video games are a good way to experience our understanding directly because they are world modelling endeavors, and you can see each turn of the world-modelling ratchet in every new generation of games.</p>

      <ScrollingStrip />
      <p style={{ marginTop: '48px' }}>Richard Feynman apparently had on his blackboard at the time of his death “What I cannot create, I do not understand”. It’s a maxim that really captures the productive friction of programming. Computers enforce understanding because they make both the definitions and the consequences of your ideas precise. The gap between what you <strong>mean</strong> and what you <strong>say</strong> manifests as a long painful road of errors, bugs, and refactors. What you get in return for this effort is <strong>demonstrable knowledge</strong>. A model that runs is a model that can be verified.</p>

      <img className="prose-image" src="/res/FeynmanCov.jpg.2400x800_q85.jpg" alt="Feynman" />

      <h2>The conversational shell</h2>

      <p><strong>A significant portion of the brain is dedicated to language, and this simple fact is the core reason why LLMs are so compelling</strong><sup className="footnote-ref"><a href="#fn1" id="fnref1">1</a></sup>. Until now, natural language had no place in formal computing outside of constrained programming language grammars or rudimentary semantic inference. But natural language computing has always been the goal: every sci-fi depiction of computers more or less predicts a future where we just talk to the computers, they do some powerful computer stuff, and then they talk back.</p>

      <p>ChatGPT demonstrated that we can conversationally retrieve knowledge embedded in LLMs. While useful, what’s more exciting to me is that there is a clear line of sight to having <strong>a conversational shell over symbolic computation</strong>. This is the pattern that truly realizes LeWitt’s original equation between an idea and the machine that creates what the idea encompasses.</p>

      <p>This aspiration suddenly seems practical. Some time around Feb 2025, it became possible to build an <strong>agentic conversational shell</strong> that sits around classical computation. A system which, given a goal: will plan, act, observe, check, and revise—often across multiple steps—until it either achieves a result or surfaces a clear blocker. Such a system decomposes goals into steps, selects tools and interfaces, invokes CLIs/APIs, writes files, starts services, inspects logs and traces, compares observations to tests and contracts, and updates its plan in response to live observations. As goals are accomplished, the entire process can be consolidated into executable formats for future repeatability. Importantly, the system is <strong>stateful</strong>, so that any side-effects that occur during one run persist into the next.</p>

      <p>In the conversational shell, the LLM acts as a <strong>compiler and a task runtime</strong>. The compiler proposes and revises execution plans; the runtime executes steps in a hybrid regime of <strong>deterministic processes</strong> (functions, typechecks, tests, policy enforcement) and freeform language. This doesn't result in a world where precision vanishes; the precision <strong>moves</strong> to <strong>interfaces, invariants, and gates</strong>. Ambiguity in natural language is resolved by execution against those gates and iteration.</p>

      <h2>A systems view</h2>

      <p>In <em>Thinking in Systems</em>, Donella Meadows ranked leverage points from the weak (tuning parameters) to the strong (<strong>changing paradigms</strong>). An agentic conversational shell over computing should be understood as paradigmatic. It moves us from “people must learn the machine’s language” to “the machine learns enough of human language to <strong>produce and operate</strong> machine language safely.” That flip means computer users who currently only “operate apps” will be able to do more with their computers, by transitioning a part of their <strong>relationship</strong> to computing to “specify outcomes under constraints”. This is not just an interface affordance; it’s a paradigm shift that reorganizes downstream behavior.</p>

      <p>One major downstream consequence of this paradigm shift is pedagogical. Seymour Papert’s <strong>constructionism</strong> argued that people learn systems by <strong>building</strong> artifacts they can debug. His “microworlds” (Logo, turtle geometry) offered tight feedback so learners could align intention and mechanism. As participation in specification widens, <strong>systems thinking</strong> will become more ubiquitous because more people will become system creators, rather than mere consumers of finished apps.</p>

      <h2>A new kind of program</h2>

      <blockquote>
        To summarize the essentials: a pattern language is a set of abstract instructions, called “patterns,” which address recurring problems and tell people what they need to do in order to resolve those problems, along with a set of sequences—the order in which to consider the patterns.<br />
        — Christopher Alexander
      </blockquote>

      <p>What does this world with dramatically more computer users vs app consumers look like? Most significantly, I think the shape of programs changes. Specifications become first‑class. There will be no such thing as a syntax error and typos will generally not be catastrophic. The distinction between code and prose will exist on a gradient. It will still be good practice for non trivial systems to formalize goals, constraints, interfaces, invariants, examples, and tests but the strictness of those will likewise exist on a gradient.</p>

      <p>When the shape of programming changes to encapsulate multiple levels of abstraction, the basic unit of work changes from specifying lines of code to specifying any of: line of code, logic, function, capability, behavior, application. Our new programs will buy <strong>determinism with checks</strong>. Type systems, property‑based tests, schema checks, idempotent operations (declarative codegen), and permission policies make runs repeatable and failures bounded; agents work is graded by those deterministic gates.</p>

      <p>Another significant change is that workflows can be <strong>long‑lived and self‑healing</strong>: if run on always-on compute like servers, agents can schedule and repair persistent or recurring work like report generation, data pipelines, or crawl-and-summarize tasks, always resuming from state,with a general purpose recovery mechanism. The significance of generality is worth calling out, because in some sense it is the crux of what is new. These systems are inherently more robust than traditional symbolic programs because they have a modality that is complete at the expense of consistency: all inputs will produce some response from an LLM, whereas most possible inputs will crash most classical functions. Whether or not the general handler will “do the right thing” comes down to the quality of the specification.</p>

      <p>Software will bias more personal. Christopher Alexander’s “patterns” are a useful analogy: independent concepts that compose into custom solutions. Alexander championed the principle of <strong>participation</strong>, arguing that environments are only great once the people who inhabit them can help make them.</p>

      <p>But if we zoom out, the most meaningful change will likely be social. When more people can participate in computing <strong>agency</strong> becomes more evenly distributed because the wall between “user” and “developer” begins to look more like a gradient. As the cost of formalization falls accessibility to leverage widens, and the <strong>economics of constructive iteration</strong> changes. More simulation will happen across more of the possibility space. Most computation performed today is heavily filtered and motivated by market forces, but as barriers fall more things will be feasible to explore.</p>

      <h2>Coda</h2>

      <p>All of this leaves us with a few threads that seem like they are converging in the current moment. LLMs come with a ton of implications for the evolution of computing, which makes building software particularly exciting right now. What’s happening broadly is that we are starting to build a conversational shell over classical computing. While graphical interfaces gave us a means to control software machines, language interfaces promise a means to create them on the fly. It’s an aspirational project not only because it directly empowers more people with analytical capability, but indirectly it admits a larger part of our society into a systems thinking framework through practice. The world is becoming incomprehensibly complex and I think, if as Papert imagined, we can all develop systems sensibilities as a byproduct of regular constructive feedback loops, social life stands to improve meaningfully via more objective and comprehensive understandings, which is the foundation for a robust sense of compassion.</p>
      <p className="byline">Rob Cheung — Sept. 2025</p>

      <hr />

      <p>At the <a href="https://zo.computer">Zo Computer Company</a>, we’re building a conversational shell over personal servers—a persistent cloud workspace where you can describe, run, and iterate on a new kind of squishy program. If any of this essay resonates with you check it out and say hi.</p>

      <section className="footnotes" id="footnotes" style={{ marginBottom: '4rem' }}>
        <ol>
          <li id="fn1">
            Another huge chunk of our brain is dedicated to visual processing and for a similar reason is why the GUI was such a significant development in the history of computing.
            <a href="#fnref1" className="footnote-backref" aria-label="Back to reference">↩</a>
          </li>
        </ol>
      </section>

      <CellularAutomaton rule={30} max_rows={16} />
    </div>
  )
}


