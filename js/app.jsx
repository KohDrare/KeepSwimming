// ============================================================
// KeepSwimming — App React principale
// while (alive) keep_swimming();
// ============================================================

const { useState, useEffect, useRef } = React;

// --- Curriculum : assemble les modules ---
const CURRICULUM = [
  window.MODULE_M0,
  window.MODULE_M1,
  window.MODULE_M2,
  window.MODULE_M3,
  window.MODULE_M4,
  window.MODULE_M5,
  window.MODULE_M6,
  window.MODULE_M7,
  window.MODULE_M8,
];

// --- Helpers ---
const getAllLessons = () => CURRICULUM.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, moduleColor: m.color, moduleTag: m.tag })));
const loadProgress = () => { try { return JSON.parse(localStorage.getItem("ks_progress") || "{}"); } catch { return {}; } };
const saveProgress = p => localStorage.setItem("ks_progress", JSON.stringify(p));

// --- Memory Boxes Visual ---
function MemoryBoxes() {
  const boxes = [
    { addr: "0x01", label: "x", val: "42" },
    { addr: "0x02", label: "y", val: "17" },
    { addr: "0x03", label: "", val: "??" },
    { addr: "0x04", label: "c", val: "'A'" },
    { addr: "0x05", label: "", val: "??" },
  ];
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "16px 0", flexWrap: "wrap" }}>
      {boxes.map((b, i) => (
        <div key={i} style={{
          background: b.label ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
          border: b.label ? "2px solid #3B82F6" : "1px dashed rgba(255,255,255,0.15)",
          borderRadius: 10, padding: "8px 14px", textAlign: "center", minWidth: 58,
        }}>
          <div style={{ fontSize: 9, opacity: 0.4, fontFamily: "monospace" }}>{b.addr}</div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "monospace", margin: "4px 0", color: b.label ? "#60A5FA" : "rgba(255,255,255,0.2)" }}>{b.val}</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: b.label ? "#F59E0B" : "rgba(255,255,255,0.2)" }}>{b.label || "libre"}</div>
        </div>
      ))}
    </div>
  );
}

// --- Code Block ---
function CodeBlock({ code }) {
  return (
    <pre style={{
      background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 10, padding: "12px 14px", overflowX: "auto",
      fontSize: 12, lineHeight: 1.65, fontFamily: "'JetBrains Mono', monospace",
      color: "#CBD5E1", margin: "10px 0", whiteSpace: "pre-wrap", wordBreak: "break-word",
    }}>{code}</pre>
  );
}

// --- Quiz ---
function Quiz({ quiz, lessonId, onComplete }) {
  const [sel, setSel] = useState(null);
  const [show, setShow] = useState(false);

  const pick = i => {
    if (show) return;
    setSel(i);
    setShow(true);
    if (i === quiz.correct) onComplete(lessonId);
  };

  const ok = sel === quiz.correct;

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "16px 16px 18px", marginTop: 20, border: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#F59E0B", marginBottom: 8 }}>&#x1F9EA; Quiz</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, lineHeight: 1.5 }}>{quiz.question}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {quiz.options.map((opt, i) => {
          let bg = "rgba(255,255,255,0.05)";
          let brd = "1px solid rgba(255,255,255,0.08)";
          if (show && i === quiz.correct) { bg = "rgba(16,185,129,0.18)"; brd = "2px solid #10B981"; }
          else if (show && i === sel) { bg = "rgba(239,68,68,0.18)"; brd = "2px solid #EF4444"; }
          return (
            <button key={i} onClick={() => pick(i)} style={{
              background: bg, border: brd, borderRadius: 10, padding: "11px 14px",
              color: "#E2E8F0", fontSize: 13, textAlign: "left", cursor: show ? "default" : "pointer",
              transition: "all 0.15s", fontFamily: "inherit", lineHeight: 1.4,
            }}>
              <span style={{ fontWeight: 700, marginRight: 8, opacity: 0.4 }}>{"ABCD"[i]}</span>{opt}
            </button>
          );
        })}
      </div>
      {show && (
        <div style={{
          marginTop: 14, padding: 14, borderRadius: 10,
          background: ok ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
          border: `1px solid ${ok ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 5, fontSize: 14, color: ok ? "#10B981" : "#EF4444" }}>
            {ok ? "✅ Correct !" : "❌ Pas tout à fait..."}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.85 }}>{quiz.explanation}</div>
          {!ok && (
            <button onClick={() => { setSel(null); setShow(false); }} style={{
              marginTop: 10, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8,
              padding: "7px 14px", color: "#E2E8F0", cursor: "pointer", fontSize: 12,
            }}>Réessayer</button>
          )}
        </div>
      )}
    </div>
  );
}

// --- Module Transition Screen ---
function ModuleTransition({ module, onStart }) {
  return (
    <div style={{
      maxWidth: 500, margin: "0 auto", padding: "60px 20px", textAlign: "center",
    }}>
      <div style={{
        fontSize: 56, marginBottom: 16,
      }}>{module.icon}</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <h2 style={{
          fontSize: 24, fontWeight: 800,
          background: `linear-gradient(135deg, ${module.color}, ${module.color}CC)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>{module.title}</h2>
        {module.tag && (
          <span style={{
            background: `${module.color}22`, color: module.color, fontSize: 12, fontWeight: 700,
            padding: "4px 10px", borderRadius: 6, border: `1px solid ${module.color}44`,
            alignSelf: "center",
          }}>{module.tag}</span>
        )}
      </div>
      <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 8, lineHeight: 1.6 }}>{module.description}</p>
      <p style={{ fontSize: 12, opacity: 0.35, marginBottom: 28 }}>{module.lessons.length} leçons</p>
      <button onClick={onStart} style={{
        background: `linear-gradient(135deg, ${module.color}, ${module.color}CC)`,
        border: "none", borderRadius: 12, padding: "14px 36px",
        color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
        fontFamily: "inherit", letterSpacing: 0.5,
      }}>Commencer</button>
    </div>
  );
}

// --- Lesson View ---
function LessonView({ lesson, moduleColor, moduleTag, allLessons, currentIndex, onComplete, onBack, onNav, progress }) {
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;
  const isDone = progress[lesson.id];

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px 100px" }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer",
        fontSize: 13, padding: "8px 0", marginBottom: 10, fontFamily: "inherit",
      }}>← Modules</button>

      <div style={{
        background: `linear-gradient(135deg, ${moduleColor}20, transparent)`,
        borderRadius: 14, padding: "18px 18px 14px", border: `1px solid ${moduleColor}33`, marginBottom: 18,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{lesson.title}</h2>
            {moduleTag && (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                background: `${moduleColor}22`, color: moduleColor, border: `1px solid ${moduleColor}44`,
              }}>{moduleTag}</span>
            )}
          </div>
          {isDone && <span style={{ fontSize: 11, background: "rgba(16,185,129,0.2)", color: "#10B981", padding: "3px 10px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap" }}>Validé ✓</span>}
        </div>
      </div>

      {lesson.content.blocks.map((block, i) => {
        if (block.type === "text") return <p key={i} style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 12px", opacity: 0.88 }}>{block.value}</p>;
        if (block.type === "analogy") return (
          <div key={i} style={{ background: "rgba(245,158,11,0.06)", borderLeft: "3px solid #F59E0B", borderRadius: "0 10px 10px 0", padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1.5 }}>&#x1F4A1; Pour comprendre</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0, opacity: 0.88 }}>{block.value}</p>
          </div>
        );
        if (block.type === "key") return (
          <div key={i} style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#3B82F6", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1.5 }}>&#x1F511; &#x00C0; retenir</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0, fontWeight: 600 }}>{block.value}</p>
          </div>
        );
        if (block.type === "code") return <CodeBlock key={i} code={block.value} />;
        if (block.type === "visual" && block.value === "memory_boxes") return <MemoryBoxes key={i} />;
        return null;
      })}

      {lesson.content.quiz && <Quiz key={lesson.id} quiz={lesson.content.quiz} lessonId={lesson.id} onComplete={onComplete} />}

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 10 }}>
        {hasPrev ? (
          <button onClick={() => onNav(currentIndex - 1)} style={{
            flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10, padding: "12px", color: "#E2E8F0", cursor: "pointer", fontSize: 13, fontFamily: "inherit",
          }}>← Précédent</button>
        ) : <div style={{ flex: 1 }} />}
        {hasNext && (
          <button onClick={() => onNav(currentIndex + 1)} style={{
            flex: 1, background: `${moduleColor}22`, border: `1px solid ${moduleColor}44`,
            borderRadius: 10, padding: "12px", color: "#E2E8F0", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit",
          }}>Suivant →</button>
        )}
      </div>
    </div>
  );
}

// --- Dashboard ---
function Dashboard({ progress }) {
  const all = getAllLessons();
  const done = all.filter(l => progress[l.id]).length;
  const pct = Math.round((done / all.length) * 100);

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "16px 16px 14px", marginBottom: 20, border: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 12, opacity: 0.4, marginBottom: 2 }}>Progression</div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>{pct}<span style={{ fontSize: 14, opacity: 0.5 }}>%</span></div>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, opacity: 0.4 }}>
          {done}/{all.length} leçons<br/>{CURRICULUM.length} modules
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 100, height: 8, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
          borderRadius: 100, transition: "width 0.5s",
        }} />
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 10, flexWrap: "wrap" }}>
        {CURRICULUM.map(m => {
          const mDone = m.lessons.filter(l => progress[l.id]).length;
          const mPct = Math.round((mDone / m.lessons.length) * 100);
          return (
            <div key={m.id} style={{
              background: `${m.color}18`, borderRadius: 6, padding: "4px 8px",
              fontSize: 10, fontWeight: 700, border: `1px solid ${m.color}33`, color: m.color,
            }}>{m.icon} {mPct}%</div>
          );
        })}
      </div>
    </div>
  );
}

// --- Module Card ---
function ModuleCard({ module, progress, onSelect }) {
  const done = module.lessons.filter(l => progress[l.id]).length;
  const allDone = done === module.lessons.length;

  return (
    <div style={{
      background: "rgba(255,255,255,0.02)", borderRadius: 14,
      border: `1px solid ${module.color}25`, overflow: "hidden", marginBottom: 14,
    }}>
      <div style={{ padding: "14px 16px", background: `linear-gradient(135deg, ${module.color}12, transparent)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }}>{module.icon}</span>
            {module.tag && (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                background: `${module.color}22`, color: module.color, border: `1px solid ${module.color}44`,
              }}>{module.tag}</span>
            )}
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 800, margin: "4px 0 2px" }}>{module.title}</h3>
          <p style={{ fontSize: 11, opacity: 0.5, margin: 0 }}>{module.description}</p>
        </div>
        <div style={{
          background: allDone ? "rgba(16,185,129,0.18)" : `${module.color}18`,
          borderRadius: 100, padding: "4px 10px", fontSize: 11, fontWeight: 700,
          color: allDone ? "#10B981" : module.color, whiteSpace: "nowrap",
        }}>{done}/{module.lessons.length}</div>
      </div>
      <div style={{ padding: "6px 10px 10px" }}>
        {module.lessons.map((l, i) => {
          const d = progress[l.id];
          return (
            <button key={l.id} onClick={() => onSelect(l, module)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
              background: d ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.02)",
              border: "none", borderRadius: 8, padding: "9px 12px",
              color: "#E2E8F0", cursor: "pointer", fontFamily: "inherit", marginBottom: 3,
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: d ? "#10B981" : "rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, flexShrink: 0, color: d ? "#fff" : "#E2E8F0",
              }}>{d ? "✓" : i + 1}</div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{l.title}</div>
              <div style={{ fontSize: 16, opacity: 0.3 }}>›</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Main App ---
function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [view, setView] = useState("home"); // "home" | "lesson" | "transition"
  const [lesson, setLesson] = useState(null);
  const [modColor, setModColor] = useState(null);
  const [modTag, setModTag] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [transitionModule, setTransitionModule] = useState(null);
  const [pendingLessonIdx, setPendingLessonIdx] = useState(null);

  const allLessons = getAllLessons();

  useEffect(() => { saveProgress(progress); }, [progress]);

  const complete = id => setProgress(p => ({ ...p, [id]: true }));

  const openLesson = (l, m) => {
    setLesson(l);
    setModColor(m.color);
    setModTag(m.tag);
    const idx = allLessons.findIndex(x => x.id === l.id);
    setCurrentIdx(idx);
    setView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navTo = idx => {
    const l = allLessons[idx];
    const currentMod = allLessons[currentIdx].moduleId;
    const nextMod = l.moduleId;

    // If changing module via Next, show transition screen
    if (nextMod !== currentMod) {
      const mod = CURRICULUM.find(c => c.id === nextMod);
      setTransitionModule(mod);
      setPendingLessonIdx(idx);
      setView("transition");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const m = CURRICULUM.find(c => c.id === nextMod);
    setLesson(l);
    setModColor(m.color);
    setModTag(m.tag);
    setCurrentIdx(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAfterTransition = () => {
    const idx = pendingLessonIdx;
    const l = allLessons[idx];
    const m = CURRICULUM.find(c => c.id === l.moduleId);
    setLesson(l);
    setModColor(m.color);
    setModTag(m.tag);
    setCurrentIdx(idx);
    setTransitionModule(null);
    setPendingLessonIdx(null);
    setView("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setView("home");
    setLesson(null);
    setModColor(null);
    setModTag(null);
    setTransitionModule(null);
  };

  const reset = () => {
    if (confirm("Remettre ta progression à zéro ?")) {
      setProgress({});
      localStorage.removeItem("ks_progress");
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "20px 16px 12px", maxWidth: 700, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div onClick={view !== "home" ? back : undefined} style={{ cursor: view !== "home" ? "pointer" : "default" }}>
          <h1 style={{
            fontSize: 22, fontWeight: 800, margin: 0,
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>KeepSwimming</h1>
          <p style={{ fontSize: 11, opacity: 0.45, marginTop: 3, fontFamily: "'JetBrains Mono', monospace", letterSpacing: -0.3 }}>while (alive) keep_swimming();</p>
        </div>
        {view === "home" && (
          <button onClick={reset} style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6, padding: "5px 10px", color: "rgba(255,255,255,0.3)",
            fontSize: 10, cursor: "pointer", fontFamily: "inherit",
          }}>Reset</button>
        )}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px 40px" }}>
        {view === "transition" && transitionModule && (
          <ModuleTransition module={transitionModule} onStart={startAfterTransition} />
        )}
        {view === "lesson" && lesson && (
          <LessonView
            lesson={lesson} moduleColor={modColor} moduleTag={modTag}
            allLessons={allLessons} currentIndex={currentIdx}
            onComplete={complete} onBack={back} onNav={navTo} progress={progress}
          />
        )}
        {view === "home" && (
          <>
            <Dashboard progress={progress} />
            {CURRICULUM.map(m => <ModuleCard key={m.id} module={m} progress={progress} onSelect={openLesson} />)}

            {/* Norme 42 reminder */}
            <div style={{
              background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)",
              borderRadius: 14, padding: "14px 16px", marginTop: 6, marginBottom: 14,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#EF4444", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1.5 }}>&#x1F4CB; Norme 42 — rappel</div>
              <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.6 }}>
                Max 25 lignes/fonction · Max 5 fonctions/fichier · Max 4 paramètres · Max 5 variables · Pas de <code>for</code>, <code>switch</code>, <code>do...while</code> · Uniquement <code>while</code> · <code>gcc -Wall -Wextra -Werror</code>
              </div>
            </div>

            {/* Footer / Credits */}
            <div style={{
              marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center", paddingBottom: 24,
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10, padding: "10px 18px",
              }}>
                <span style={{ fontSize: 16 }}>⚡</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#E2E8F0" }}>
                    Built by <span style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KohDrare</span>
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.4, marginTop: 1 }}>
                    Vibe coded with Claude AI — for 42 students, by a 42 student
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 10, opacity: 0.25 }}>
                github.com/KohDrare/KeepSwimming • 42brussels — {new Date().getFullYear()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
