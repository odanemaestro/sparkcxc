import React, { useState } from "react";
import "./birthControlExplorer.css";

const METHODS = {
  abstinence:{
    title:"Abstinence",
    category:"Behavioural",
    how:"Avoiding sexual intercourse prevents sperm from reaching an ovum.",
    sti:"Prevents sexual transmission when sexual contact does not occur.",
    note:"No device or hormone is used.",
  },
  barrier:{
    title:"Barrier methods",
    category:"Condom, diaphragm, cervical cap",
    how:"A physical barrier prevents sperm from entering the uterus or reaching the ovum.",
    sti:"Condoms reduce the risk of many sexually transmitted infections. Diaphragms and cervical caps do not provide the same STI protection.",
    note:"The method must be used correctly each time it is needed.",
  },
  hormonal:{
    title:"Hormonal methods",
    category:"Pill, injection, patch, implant",
    how:"Hormones mainly prevent ovulation and may also thicken cervical mucus.",
    sti:"They do not protect against sexually transmitted infections.",
    note:"Correct and consistent use matters. Some methods require a health-care provider.",
  },
  iud:{
    title:"Intrauterine devices",
    category:"Copper IUD and hormonal IUD",
    how:"A copper IUD interferes with sperm and fertilisation. A hormonal IUD thickens cervical mucus and inhibits sperm.",
    sti:"IUDs do not protect against sexually transmitted infections.",
    note:"An IUD is placed in the uterus by a trained health-care provider.",
  },
  awareness:{
    title:"Fertility-awareness methods",
    category:"Calendar or rhythm method, Billings cervical-mucus method",
    how:"The fertile part of the cycle is estimated and unprotected intercourse is avoided during that time.",
    sti:"These methods do not protect against sexually transmitted infections.",
    note:"Timing of ovulation can vary, so prediction is not exact.",
  },
  withdrawal:{
    title:"Withdrawal",
    category:"Behavioural",
    how:"The penis is withdrawn before ejaculation to reduce the chance that semen enters the vagina.",
    sti:"Withdrawal does not protect against sexually transmitted infections.",
    note:"It is less reliable because withdrawal may be late and sperm can be present before full ejaculation.",
  },
  surgical:{
    title:"Surgical methods",
    category:"Vasectomy and tubal ligation",
    how:"Vasectomy blocks the sperm ducts. Tubal ligation blocks the oviducts so sperm and ovum cannot meet.",
    sti:"These methods do not protect against sexually transmitted infections.",
    note:"They are intended as permanent methods and require medical procedures.",
  },
};

function MethodVisual({method}) {
  if (method === "barrier") {
    return (
      <svg viewBox="0 0 760 340" role="img" aria-label="Barrier contraception prevents sperm from reaching an ovum">
        <circle className="bc-ovum" cx="590" cy="170" r="52" />
        {[0,1,2,3].map(i => (
          <g key={i} className="bc-sperm" transform={"translate("+(120+i*55)+" "+(115+i*30)+")"}>
            <circle cx="0" cy="0" r="10" /><path d="M-8 8q-35 20-48 58" />
          </g>
        ))}
        <rect className="bc-barrier" x="375" y="45" width="35" height="250" rx="16" />
        <path className="bc-block" d="M300 170H365" />
        <text className="bc-label" x="392" y="325" textAnchor="middle">physical barrier</text>
      </svg>
    );
  }

  if (method === "hormonal") {
    return (
      <svg viewBox="0 0 760 340" role="img" aria-label="Hormonal contraception mainly prevents ovulation">
        <ellipse className="bc-ovary" cx="225" cy="170" rx="85" ry="58" />
        <circle className="bc-follicle" cx="230" cy="170" r="30" />
        <path className="bc-release blocked" d="M315 170H480" />
        <circle className="bc-ovum faint" cx="545" cy="170" r="42" />
        <path className="bc-stop" d="M385 110L470 230M470 110L385 230" />
        <text className="bc-label" x="380" y="300" textAnchor="middle">ovulation is suppressed</text>
      </svg>
    );
  }

  if (method === "iud") {
    return (
      <svg viewBox="0 0 760 340" role="img" aria-label="Intrauterine device placed inside the uterus">
        <path className="bc-uterus" d="M250 70Q380 25 510 70Q550 150 520 245Q470 295 380 305Q290 295 240 245Q210 150 250 70Z" />
        <path className="bc-iud" d="M380 105V245M325 115H435M380 245q-18 35-12 62m12-62q18 35 12 62" />
        <text className="bc-label" x="380" y="325" textAnchor="middle">IUD sits inside the uterus</text>
      </svg>
    );
  }

  if (method === "surgical") {
    return (
      <svg viewBox="0 0 760 340" role="img" aria-label="Surgical contraception blocks reproductive tubes">
        <g transform="translate(55 35)">
          <ellipse className="bc-testis" cx="110" cy="205" rx="50" ry="62" />
          <path className="bc-duct" d="M135 175Q175 110 235 95Q275 85 300 110" />
          <path className="bc-cut" d="M205 92l38 38m0-38l-38 38" />
          <text className="bc-small" x="175" y="290" textAnchor="middle">vasectomy blocks sperm ducts</text>
        </g>
        <g transform="translate(400 25)">
          <path className="bc-mini-uterus" d="M85 110Q150 75 215 110Q230 175 205 235Q150 270 95 235Q70 175 85 110Z" />
          <path className="bc-tube" d="M100 120Q55 75 15 110M200 120Q245 75 285 110" />
          <path className="bc-cut" d="M38 86l30 30m0-30l-30 30M232 86l30 30m0-30l-30 30" />
          <text className="bc-small" x="150" y="300" textAnchor="middle">tubal ligation blocks oviducts</text>
        </g>
      </svg>
    );
  }

  if (method === "awareness") {
    return (
      <svg viewBox="0 0 760 340" role="img" aria-label="Fertility awareness tracks changes across the menstrual cycle">
        <circle className="bc-cycle" cx="380" cy="165" r="110" />
        <path className="bc-cycle-window" d="M455 85A110 110 0 0 1 484 210" />
        <circle className="bc-cycle-dot" cx="485" cy="165" r="13" />
        <text className="bc-day" x="380" y="155" textAnchor="middle">fertile days</text>
        <text className="bc-small" x="380" y="182" textAnchor="middle">are estimated, not guaranteed</text>
        <text className="bc-label" x="380" y="315" textAnchor="middle">cycle timing and cervical mucus can be observed</text>
      </svg>
    );
  }

  if (method === "withdrawal") {
    return (
      <svg viewBox="0 0 760 340" role="img" aria-label="Withdrawal is a timing-dependent behavioural method">
        <path className="bc-timing-arrow" d="M140 170H545" />
        <circle className="bc-clock" cx="350" cy="170" r="88" />
        <line className="bc-clock-hand" x1="350" y1="170" x2="350" y2="115" />
        <line className="bc-clock-hand" x1="350" y1="170" x2="400" y2="195" />
        <path className="bc-stop" d="M555 110L640 230M640 110L555 230" />
        <text className="bc-label" x="380" y="315" textAnchor="middle">depends on correct timing every time</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 760 340" role="img" aria-label="Abstinence prevents sperm and ovum from meeting">
      <circle className="bc-ovum" cx="585" cy="170" r="52" />
      <g className="bc-sperm" transform="translate(165 170)"><circle cx="0" cy="0" r="11" /><path d="M-8 8q-45 18-70 60" /></g>
      <path className="bc-stop large" d="M320 85L445 255M445 85L320 255" />
      <text className="bc-label" x="380" y="315" textAnchor="middle">no sexual intercourse means the gametes cannot meet</text>
    </svg>
  );
}

export default function BirthControlExplorer() {
  const [method,setMethod] = useState("barrier");
  const info = METHODS[method];

  return (
    <section className="spark-birth-control">
      <header>
        <span>BIRTH CONTROL METHODS</span>
        <h3>Compare how each method prevents pregnancy</h3>
        <p>Focus on mechanism, permanence, need for correct use and whether the method reduces STI transmission.</p>
      </header>

      <div className="spark-birth-control-tabs">
        {Object.entries(METHODS).map(([key,item]) => (
          <button type="button" key={key} className={method === key ? "active" : ""} onClick={() => setMethod(key)}>
            {item.title}
          </button>
        ))}
      </div>

      <div className="spark-birth-control-grid">
        <div className="spark-birth-control-stage"><MethodVisual method={method} /></div>
        <aside>
          <span>{info.category}</span>
          <h4>{info.title}</h4>
          <div><b>How it works</b><p>{info.how}</p></div>
          <div><b>STI protection</b><p>{info.sti}</p></div>
          <div><b>Important point</b><p>{info.note}</p></div>
        </aside>
      </div>

      <div className="spark-birth-control-key">
        <strong>Key distinction</strong>
        <span>Condoms are the contraceptive method in this lesson that also reduce transmission of many STIs. Abstaining from sexual intercourse prevents pregnancy and sexual transmission while abstinence is maintained. Other contraceptive methods do not provide STI protection.</span>
      </div>
    </section>
  );
}
