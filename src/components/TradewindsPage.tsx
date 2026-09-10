// Asset URLs from Figma (valid for 7 days)
const imgGroup = 'https://www.figma.com/api/mcp/asset/a8893ee5-7e32-49f4-804f-c398237654ef'
const imgGroup1 = 'https://www.figma.com/api/mcp/asset/21652ff0-e1a6-46fb-8e2f-e7f3ee0d9fab'
const imgGroup2 = 'https://www.figma.com/api/mcp/asset/7b4c4640-475f-4fa2-87ac-3dcaab9f3efb'
const imgGroup3 = 'https://www.figma.com/api/mcp/asset/cd5ef8e3-fa19-419f-ba1e-6e80f4838e65'
const imgGroup4 = 'https://www.figma.com/api/mcp/asset/12594a06-995d-4ebc-b67e-9e5b81a8bae2'
const imgGroup5 = 'https://www.figma.com/api/mcp/asset/90bebdd8-be56-4b53-985a-0f6d7e8cd052'
const imgGroup6 = 'https://www.figma.com/api/mcp/asset/8c465618-7235-4221-96ff-9165ee1c7a71'
const imgGroup7 = 'https://www.figma.com/api/mcp/asset/35986530-7332-4c45-8472-d2c57625a5c9'
const imgVector = 'https://www.figma.com/api/mcp/asset/d4088009-bf19-4f6f-96e5-20e7e5b2b85b'
const imgArrowRightUp = 'https://www.figma.com/api/mcp/asset/f80c8902-07ba-43d8-b716-71a2dc0ba738'
const imgArrowDropDownLine = 'https://www.figma.com/api/mcp/asset/f46c04f2-6c09-4255-a89b-f560f0b2c6de'
const imgTradewindsSolutionsAwardableLogo2 = 'https://www.figma.com/api/mcp/asset/54591659-4717-421d-8582-66388bc004f6'
const imgScreenshot = 'https://www.figma.com/api/mcp/asset/772c6bb8-aee3-41ac-b6e0-5485cd96a838'
const imgBg = 'https://www.figma.com/api/mcp/asset/9cd9beba-7e63-46d4-a12b-b994ff292a73'
const imgEllipse2786 = 'https://www.figma.com/api/mcp/asset/c673ffbc-c41b-4031-85c0-b8e4359ce3cc'
const imgEllipse2788 = 'https://www.figma.com/api/mcp/asset/c58a1301-fd3b-4dce-b803-0c0436a5328f'
const imgEllipse2789 = 'https://www.figma.com/api/mcp/asset/813b7217-c6f4-41ae-84f3-7be51c2d17ba'
const imgPipesPlumbing = 'https://www.figma.com/api/mcp/asset/2291ccb5-8562-4190-b2fe-bb0e26163ea2'
const imgCloseCircleFill = 'https://www.figma.com/api/mcp/asset/ba1dc3e5-8397-4888-bd1b-2dac05d7585a'
const imgOperations = 'https://www.figma.com/api/mcp/asset/fed7de49-78d2-4bff-871e-1ce85d7c7ad3'
const imgIcon = 'https://www.figma.com/api/mcp/asset/4274664e-0ca9-4ea1-88ce-895b69d87b8c'
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/c407a2f9-be85-49e9-8f8e-eddb13867fac'
const imgJozuHeroImage = 'https://www.figma.com/api/mcp/asset/602f94a3-1c96-408b-ac54-e04ce20e1fcb'
const imgUnion = 'https://www.figma.com/api/mcp/asset/a99f7fff-8b3c-4364-8451-81741d95ad97'
const imgFrameHorizontalConnectors = 'https://www.figma.com/api/mcp/asset/9b819fac-929f-48f4-be0f-71bb7e727fca'
const imgCheck = 'https://www.figma.com/api/mcp/asset/2169cf1d-72ea-4fce-b740-de0c870031d3'
const imgFrameHorizontalConnection = 'https://www.figma.com/api/mcp/asset/0bec66b8-df22-4628-82c1-b252bfc6f9f4'
const imgCertified = 'https://www.figma.com/api/mcp/asset/2f198ba3-30b1-46a0-9d81-cddf251fa034'
const imgGovernment = 'https://www.figma.com/api/mcp/asset/61c4af2f-6d2d-409c-a145-0ad03377885d'
const imgEurope = 'https://www.figma.com/api/mcp/asset/3a3ba97f-0f1e-414a-9e1e-13fbd38f4532'
const imgBuilding = 'https://www.figma.com/api/mcp/asset/72c88623-331b-4781-841a-c152e236f875'
const imgVector1 = 'https://www.figma.com/api/mcp/asset/6d1bc76f-5163-4040-b79a-3e4b0ec49fa1'
const imgVector2 = 'https://www.figma.com/api/mcp/asset/0b19dac6-cc97-4586-9af0-cb603d6600c8'
const img13AwardableLogo = 'https://www.figma.com/api/mcp/asset/f9c86192-6154-44c7-85c5-5eb49271eb2f'
const imgCncfMemberSilver = 'https://www.figma.com/api/mcp/asset/24b9392a-7b2f-4f40-9195-8e83697b0e02'

/* ─── Nav Bar ─── */
function NavBar() {
  return (
    <nav className="bg-black flex items-center justify-between px-16 py-4 h-20 w-full shrink-0">
      <div className="flex gap-14 items-center">
        {/* Logo */}
        <div className="h-[37px] w-[113px] overflow-hidden relative shrink-0">
          <div className="absolute h-[36.868px] left-[34.66px] top-0 w-[78.336px]">
            <img alt="Jozu" className="absolute inset-0 w-full h-full object-contain" src={imgGroup2} />
          </div>
          <div className="absolute h-[28.399px] left-0 top-[8.47px] w-[21.823px]">
            <img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgGroup3} />
          </div>
        </div>
        {/* Nav links */}
        <div className="flex gap-10 items-center py-1">
          {['Product'].map((item) => (
            <span key={item} className="text-white text-base leading-6 font-normal cursor-pointer">{item}</span>
          ))}
          <div className="flex gap-2 items-center cursor-pointer">
            <span className="text-white text-base leading-6 font-normal">Solutions</span>
            <img alt="" className="size-6" src={imgArrowDropDownLine} />
          </div>
          {['Pricing', 'Blog', 'Company'].map((item) => (
            <span key={item} className="text-white text-base leading-6 font-normal cursor-pointer">{item}</span>
          ))}
        </div>
      </div>
      {/* CTA */}
      <button
        className="flex gap-2 items-center justify-center px-4 py-4 rounded-[4px] text-[#040e0c] text-base leading-6 font-normal shadow-[inset_0px_-2px_1px_0px_rgba(5,23,20,0.25)]"
        style={{ backgroundImage: 'linear-gradient(73.3deg, #f6f6f6 0%, #ffffff 49.9%, #f6f6f6 99.9%)' }}
      >
        On-Demand Demo
      </button>
    </nav>
  )
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative flex flex-col items-start gap-[88px] pl-[184px] pr-[304px] py-60 w-full shrink-0 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-[1449px]">
        <img alt="" className="w-full h-full object-cover" src={imgBg} />
      </div>

      <div className="relative flex flex-col gap-[88px] items-center w-[1168px]">
        {/* Top row: text + logo */}
        <div className="relative flex gap-16 items-start w-full">
          {/* Left: headline + body + button */}
          <div className="flex flex-col gap-14 items-start w-[685px]">
            <h1
              className="text-[72px] leading-[72px] font-normal bg-clip-text text-transparent whitespace-pre-wrap"
              style={{ backgroundImage: 'linear-gradient(90deg, #fff 0%, #fff 100%)' }}
            >
              <span className="text-white">Secure AI for </span>
              <br />
              <span className="text-[#2cfecc]">Defense Missions</span>
            </h1>
            <p className="text-[30px] leading-9 text-white font-normal">
              Jozu has achieved{' '}
              <strong className="font-bold">Awardable status</strong>
              {' '}through the Department of Defense Chief Digital and Artificial Intelligence Office's (CDAO) Tradewinds Solutions Marketplace—meaning our solution has met rigorous evaluation standards and is ready for rapid acquisition by DoD customers.
            </p>
            <button className="bg-[#2cfecc] flex gap-2 items-center justify-center px-4 py-4 rounded-[4px] text-[#040e0c] text-base leading-6 font-normal shadow-[inset_0px_-2px_1px_0px_rgba(5,23,20,0.25)]">
              <div className="relative size-[14px]">
                <div className="absolute inset-[8%]">
                  <img alt="" className="w-full h-full object-contain" src={imgVector} />
                </div>
              </div>
              Visit the Tradewinds Marketplace
              <div className="relative size-[14px]">
                <div className="absolute inset-[8%]">
                  <img alt="" className="w-full h-full object-contain" src={imgVector} />
                </div>
              </div>
            </button>
          </div>

          {/* Tradewinds Awardable Logo — positioned absolutely */}
          <div className="absolute left-[788px] top-7 size-[301px] overflow-hidden">
            <img
              alt="Tradewinds Solutions Awardable"
              className="w-[173.91%] h-[173.91%] absolute max-w-none"
              style={{ left: '-36.96%', top: '-36.87%' }}
              src={imgTradewindsSolutionsAwardableLogo2}
            />
          </div>
        </div>

        {/* Screenshot */}
        <div className="border border-white/30 rounded-[4px] w-[1168px] h-[661px] overflow-hidden relative">
          <img
            alt="Jozu product screenshot"
            className="absolute inset-0 w-full h-full object-cover rounded-[4px]"
            src={imgScreenshot}
          />
        </div>
      </div>
    </section>
  )
}

/* ─── Problem Cards (Why Jozu) ─── */
function ProblemCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#1f1f1f] flex flex-col gap-6 items-start pb-12 pt-8 px-8 rounded-[12px] shadow-[0px_36px_56px_-30px_#ff003d,0px_0px_0px_0.826px_#071e1a] overflow-hidden">
      <div className="relative size-16 overflow-hidden shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-6 items-start w-full">
        <p className="text-white text-[20px] leading-7 font-normal">{title}</p>
        <p className="text-[#cdcdcd] text-base leading-6 font-normal">{description}</p>
      </div>
    </div>
  )
}

/* ─── How It Works / Why Section ─── */
function WhySection() {
  return (
    <section className="bg-black relative flex flex-col gap-60 items-center justify-center px-16 py-60 w-full shrink-0 overflow-hidden">
      {/* Glow orb */}
      <div className="absolute size-[700px] right-[-350px] top-[446px] pointer-events-none">
        <img alt="" className="w-[173%] h-[173%] absolute max-w-none" style={{ left: '-36.42%', top: '-36.42%' }} src={imgEllipse2786} />
      </div>

      <div className="relative flex items-start justify-between w-full max-w-[1408px]">
        {/* Left text */}
        <div className="flex flex-col gap-12 items-start w-[505px]">
          <div className="flex gap-6 items-center">
            <div className="bg-[#2cfecc] shrink-0 size-3" />
            <span className="font-mono text-white text-base leading-6 tracking-[0.16px] uppercase">WHY JOZU</span>
          </div>
          <p className="text-[54px] leading-[65px] text-white font-normal whitespace-pre-wrap">
            Defense organizations face{' '}
            <span className="text-[#ff003d]">critical obstacles</span>
            {' '}in deploying AI at scale:
          </p>
          <div className="pt-6">
            <button className="bg-[#040e0c] border border-[#2cfecc] flex gap-2 items-center justify-center px-4 py-4 rounded-[4px] text-[#2cfecc] text-base leading-6 font-normal shadow-[inset_0px_-2px_1px_0px_rgba(5,23,20,0.25)]">
              <img alt="" className="size-[14px]" src={imgArrowRightUp} />
              Learn more
              <img alt="" className="size-[14px]" src={imgArrowRightUp} />
            </button>
          </div>
        </div>

        {/* Right 2x2 grid of cards */}
        <div className="grid grid-cols-2 gap-10 w-[691px]">
          <ProblemCard
            icon={
              <>
                <div className="absolute left-2 top-[10.91px] size-12">
                  <img alt="" className="w-full h-full object-contain" src={imgPipesPlumbing} />
                </div>
                <div className="absolute left-8 top-7 size-[30.5px]">
                  <img alt="" className="w-full h-full object-contain" src={imgCloseCircleFill} />
                </div>
              </>
            }
            title="Fragmented pipelines"
            description="Model and agent development scattered across disconnected tools"
          />
          <ProblemCard
            icon={
              <>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-12">
                  <img alt="" className="w-full h-full object-contain" src={imgOperations} />
                </div>
                <div className="absolute left-8 top-7 size-[30.5px]">
                  <img alt="" className="w-full h-full object-contain" src={imgCloseCircleFill} />
                </div>
              </>
            }
            title="Vendor lock-in"
            description="Proprietary formats and lack of open standards hinder innovation"
          />
          <ProblemCard
            icon={<img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgIcon} />}
            title="Insufficient governance"
            description="Limited visibility into model provenance and security posture"
          />
          <ProblemCard
            icon={<img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgIcon1} />}
            title="Air-Gapped Requirements"
            description="Works in the cloud, on-premises, or at the tactical edge"
          />
        </div>
      </div>
    </section>
  )
}

/* ─── Feature Item ─── */
function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-8 items-start w-[332px]">
      <div className="flex gap-5 items-center w-full">
        <div className="bg-[#f2f2f2] border border-[#f2f2f2] flex items-center justify-center p-[11px] rounded-[7px] size-[41px] shrink-0">
          <div className="relative size-5 overflow-hidden">
            <img alt="" className="absolute inset-0 w-full h-full object-contain" src={icon} />
          </div>
        </div>
        <p className="text-black text-[30px] leading-9 font-normal flex-1 min-w-0">{title}</p>
      </div>
      <p className="text-[#9b9b9b] text-base leading-6 font-normal w-full">{description}</p>
    </div>
  )
}

/* ─── Secure and Govern (Why Jozu Features) ─── */
function SecureGovSection() {
  return (
    <section className="bg-white relative flex gap-8 items-start px-16 py-60 w-full shrink-0 overflow-hidden">
      {/* Bottom background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-[366px] flex items-center justify-center overflow-hidden rotate-180">
        <div className="relative w-[1536px] h-[366px] overflow-hidden">
          <div className="absolute top-0 left-0 w-[1920px] h-[360px] overflow-hidden">
            <img
              alt=""
              className="absolute w-full max-w-none"
              style={{ top: '-284.13%', left: 0 }}
              src={imgJozuHeroImage}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* Left text column */}
      <div className="relative flex flex-col gap-16 items-start px-12 w-[568px] shrink-0">
        <div className="flex gap-6 items-center">
          <div className="bg-[#2cfecc] shrink-0 size-3" />
          <span className="font-mono text-white text-base leading-6 tracking-[0.16px] uppercase">WHY JOZU</span>
        </div>
        <div className="flex flex-col gap-10 items-start w-full">
          <p className="text-black text-[54px] leading-[65px] font-normal w-full">
            Secure and govern your ML from cloud to edge, across every classification level.
          </p>
        </div>
      </div>

      {/* Right features grid */}
      <div className="relative flex flex-wrap gap-x-12 gap-y-16 items-start px-12 w-[808px] shrink-0">
        <FeatureItem
          icon={imgGroup4}
          title="Tamper-Proof Model Packaging"
          description="Package AI models, datasets, code, and configurations into OCI-compliant ModelKits — standardized, immutable units built on open standards that work with your existing container registries. No vendor lock-in."
        />
        <FeatureItem
          icon={imgGroup5}
          title="Cryptographic Chain of Custody"
          description="Every artifact includes verifiable metadata and signed provenance attestations, creating an unbroken audit trail from development through deployment — across classification levels."
        />
        <FeatureItem
          icon={imgGroup6}
          title="AI-Specific Security Scanning"
          description="Automated scanning detects model-specific vulnerabilities and enforces security policies before models touch production infrastructure."
        />
        <FeatureItem
          icon={imgGroup7}
          title="Policy-Enforced Deployment"
          description="Define and enforce governance policies across your entire ML lifecycle, from cloud to edge. Ensure compliance with NIST AI RMF, ISO 42001, and other frameworks — regardless of deployment environment."
        />
      </div>
    </section>
  )
}

/* ─── Built for Defense Environments ─── */
function DefenseEnvironmentsSection() {
  return (
    <section className="bg-white flex flex-col gap-[88px] items-center justify-center px-16 py-60 w-full shrink-0">
      {/* Title */}
      <div className="flex flex-col gap-10 items-center text-center w-[686px]">
        <p className="text-black text-[54px] leading-[65px] font-normal w-full">
          Built for Defense Environments
        </p>
        <p className="text-[#9b9b9b] text-[20px] leading-7 font-normal w-full">
          Designed to operate in the most secure and challenging environments
        </p>
      </div>

      {/* Three columns */}
      <div className="flex gap-8 items-start w-full">
        {[
          {
            title: 'Air-Gapped Operations',
            sub: 'Jozu is installed completely behind your firewall.',
            body: 'Data never leaves your environment, and the platform operates fully in disconnected, air-gapped networks.',
          },
          {
            title: 'Integrates with Your Stack',
            sub: 'Jozu works alongside the tools you already use:',
            body: 'Built on open standards and backed by the Cloud Native Computing Foundation, Jozu allows your team to embrace best practices, while avoiding vendor lock-in',
          },
          {
            title: 'Kubernetes-Native',
            sub: 'Deploy to any Kubernetes environment.',
            body: 'In-cluster deployment caching eliminates redundant builds and expensive network transfers.',
          },
        ].map((col) => (
          <div key={col.title} className="flex flex-col gap-10 items-start flex-1 min-w-0 px-8">
            <p className="text-black text-[30px] leading-9 font-normal w-full">{col.title}</p>
            <p className="font-mono text-black text-xs leading-4 uppercase w-full">{col.sub}</p>
            <p className="text-[#9b9b9b] text-[20px] leading-7 font-normal w-full">{col.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Tradewinds Evaluators Section ─── */
function EvaluatorsSection() {
  const checks = [
    { title: 'Precise problem articulation', sub: 'Of defense AI challenges' },
    { title: 'Standardized OCI-compliant ModelKits', sub: 'With tamper-evident provenance' },
    { title: 'Simple subscription model', sub: 'Well-aligned to secure, multi-cluster DoD deployments' },
    { title: 'Air-gapped environment support', sub: 'For disconnected operations' },
  ]

  return (
    <section className="bg-white flex flex-col gap-[88px] items-center overflow-hidden py-60 w-full shrink-0 relative">
      {/* Glow orbs */}
      <div className="absolute size-[808px] pointer-events-none" style={{ left: 'calc(50% - 296px - 404px)', top: '-303px' }}>
        <img alt="" className="w-[161%] h-[161%] absolute max-w-none" style={{ left: '-30.2%', top: '-36.42%' }} src={imgEllipse2788} />
      </div>
      <div className="absolute size-[808px] pointer-events-none" style={{ left: 'calc(50% + 267px - 404px)', top: '-504px' }}>
        <img alt="" className="w-[161%] h-[161%] absolute max-w-none" style={{ left: '-30.2%', top: '-36.42%' }} src={imgEllipse2789} />
      </div>

      {/* Jozu shield logo */}
      <div className="bg-[#051714] border border-white flex items-center justify-center p-7 rounded-[12px] size-20 shrink-0">
        <div className="relative size-8 h-10">
          <img alt="Jozu" className="absolute inset-0 w-full h-full object-contain" src={imgUnion} />
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col items-center w-[928px]">
        <p className="text-black text-[54px] leading-[65px] font-normal text-center w-full">
          What Tradewinds Evaluators Recognized
        </p>
      </div>

      {/* Quote + checklist grid */}
      <div className="relative inline-grid place-items-start">
        {/* Horizontal connectors graphic */}
        <div className="col-start-1 row-start-1 relative h-[609px] w-[1177px] ml-[4.5px]">
          <img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgFrameHorizontalConnectors} />
        </div>

        {/* Quote text */}
        <div className="col-start-1 row-start-1 absolute h-[289px] w-[1018px] opacity-65" style={{ left: '84.5px', top: '1px' }}>
          <p className="absolute text-[128px] leading-none font-bold text-[#2cfecc]" style={{ left: '-5px', top: 0 }}>"</p>
          <p className="absolute text-black text-[30px] leading-9 font-normal w-[877px]" style={{ left: '68px', top: '96px' }}>
            Jozu enables secure packaging, cryptographic signing, automated AI-powered security scanning, supply-chain verification, and policy-enforced deployment, helping ensure that AI agents and models are built securely, tamper-proof when deployed, and easy to audit for mission-critical environments.
          </p>
          <div className="absolute flex items-center justify-center" style={{ left: '961px', top: '138px', width: '57px', height: '124px' }}>
            <p className="text-[128px] leading-none font-bold text-[#2cfecc] rotate-180">"</p>
          </div>
        </div>

        {/* Horizontal connection line */}
        <div className="col-start-1 row-start-1 absolute h-[11px] w-[1187px]" style={{ left: 0, top: '322px' }}>
          <img alt="" className="absolute inset-0 w-full h-full" src={imgFrameHorizontalConnection} />
        </div>

        {/* "The assessment highlighted:" label */}
        <p className="col-start-1 row-start-1 absolute text-[#565656] text-base leading-6 font-normal w-[434px]" style={{ left: '84.5px', top: '373px' }}>
          The assessment highlighted:
        </p>

        {/* Checklist */}
        <div className="col-start-1 row-start-1 absolute flex flex-wrap gap-10 items-start w-[972px]" style={{ left: '107.5px', top: '448px' }}>
          {checks.map((item) => (
            <div key={item.title} className="flex gap-4 items-start w-[466px]">
              <div className="relative size-8 shrink-0">
                <img alt="✓" className="absolute inset-0 w-full h-full" src={imgCheck} />
              </div>
              <div className="flex flex-col gap-3 items-start">
                <p className="text-black text-[20px] leading-7 font-normal w-[434px]">{item.title}</p>
                <p className="text-[#565656] text-base leading-6 font-normal w-[434px]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Proven in Production ─── */
function ProvenSection() {
  return (
    <section className="bg-white flex flex-col items-center px-16 py-60 w-full shrink-0">
      <div className="flex flex-col gap-[88px] items-center w-full max-w-[1408px]">
        {/* Header */}
        <div className="flex flex-col gap-10 items-center w-[928px]">
          <div className="bg-[#f2f2f2] border-2 border-[#e0e0e0] flex items-center p-[5px] rounded-[29.5px] size-[59px]">
            <img alt="" className="h-[49px] w-[48.8px]" src={imgCertified} />
          </div>
          <p className="text-black text-[54px] leading-[65px] font-normal text-center w-full">
            Proven in Production
          </p>
          <p className="text-[#565656] text-[20px] leading-7 font-bold text-center w-full">
            security Jozu's technology is trusted by:
          </p>
        </div>

        {/* Cards */}
        <div className="flex gap-10 items-start justify-center w-[1288px]">
          {/* US Government */}
          <div className="bg-[#f2f2f2] border-[1.8px] border-[#e0e0e0] flex flex-col gap-10 items-start p-8 rounded-[20px] self-stretch w-[320px]">
            <div className="bg-white border border-[#e0e0e0] flex items-center justify-center p-[9px] rounded-[7px] size-[72px]">
              <img alt="" className="size-[50px]" src={imgGovernment} />
            </div>
            <p className="text-black text-[30px] leading-9 font-normal">
              U.S. Government agencies
            </p>
          </div>

          {/* European Government */}
          <div className="bg-[#f2f2f2] border-[1.8px] border-[#e0e0e0] flex flex-col gap-10 items-start p-8 rounded-[20px] self-stretch w-[320px]">
            <div className="bg-white border border-[#e0e0e0] flex items-center justify-center p-[9px] rounded-[7px] size-[72px]">
              <img alt="" className="size-[50px]" src={imgEurope} />
            </div>
            <p className="text-black text-[30px] leading-9 font-normal">
              European Government organizations
            </p>
          </div>

          {/* Global enterprises */}
          <div className="bg-[#f2f2f2] border-[1.8px] border-[#e0e0e0] flex flex-col gap-10 items-start p-8 rounded-[20px] w-[320px]">
            <div className="bg-white border border-[#e0e0e0] flex items-center justify-center p-[9px] rounded-[7px] size-[72px]">
              <img alt="" className="size-[50px]" src={imgBuilding} />
            </div>
            <div className="flex flex-col gap-8 items-start w-full text-black">
              <p className="text-[30px] leading-9 font-normal w-full">Global enterprises</p>
              <ul className="list-disc text-[20px] leading-7 font-normal pl-8 text-[#565656]">
                <li>finance</li>
                <li>healthcare</li>
                <li>telecommunications</li>
                <li>logistic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Marketplace CTA ─── */
function MarketplaceCTASection() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-16 py-60 w-full shrink-0">
      <div className="flex flex-col gap-20 items-center px-60 w-full">
        <div className="flex flex-col gap-10 items-center w-full">
          {/* Bracket label */}
          <div className="flex gap-4 items-center h-6">
            <div className="h-[23.7px] w-[10.7px] relative shrink-0">
              <img alt="" className="absolute inset-0 w-full h-full" src={imgVector1} />
            </div>
            <span className="text-white text-base leading-6 font-normal tracking-[1.6px] uppercase text-center">
              Label
            </span>
            <div className="h-[23.7px] w-[10.7px] relative shrink-0">
              <img alt="" className="absolute inset-0 w-full h-full" src={imgVector2} />
            </div>
          </div>

          {/* Headline */}
          <p className="text-[54px] leading-[65px] font-normal text-center w-full">
            <span className="text-[#1db18e] font-bold">Government customers </span>
            <span className="text-[#040e0c]">can view our awardable solution on the Tradewinds Solutions Marketplace</span>
          </p>

          {/* Sub */}
          <p className="text-[#565656] text-[20px] leading-7 font-normal text-center w-full">
            Get started and create a Tradewinds Marketplace Account
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 items-center">
          <button className="bg-[#2cfecc] flex gap-2 items-center justify-center px-4 py-4 rounded-[4px] text-[#040e0c] text-base leading-6 font-normal shadow-[inset_0px_-2px_1px_0px_rgba(5,23,20,0.25)]">
            <div className="relative size-[14px]">
              <div className="absolute inset-[8%]">
                <img alt="" className="w-full h-full object-contain" src={imgVector} />
              </div>
            </div>
            Visit the Tradewinds Marketplace
            <div className="relative size-[14px]">
              <div className="absolute inset-[8%]">
                <img alt="" className="w-full h-full object-contain" src={imgVector} />
              </div>
            </div>
          </button>
          <button className="bg-[#040e0c] flex gap-2 items-center justify-center px-4 py-4 rounded-[4px] text-[#2cfecc] text-base leading-6 font-normal shadow-[inset_0px_-2px_1px_0px_rgba(94,94,94,0.25)]">
            Contact Jozu
            <div className="relative size-[14px]">
              <div className="absolute inset-[8%]">
                <img alt="" className="w-full h-full object-contain" src={imgArrowRightUp} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Tagline Banner ─── */
function TaglineBanner() {
  return (
    <div className="bg-[#002b29] flex flex-col items-center justify-center px-60 py-[88px] w-full shrink-0">
      <p className="font-mono text-[#2cfecc] text-[20px] leading-7 font-normal text-center w-full">
        Jozu — The model you deploy is the model you tested,{' '}
        <br />
        with a verifiable chain of custody all the way back through your suppliers.
      </p>
    </div>
  )
}

/* ─── Footer ─── */
function TradewindsFooter() {
  return (
    <footer className="bg-black flex flex-col items-start px-16 w-full shrink-0">
      <div className="flex flex-col gap-14 items-start pl-[124px] py-36 w-full">
        {/* Top: Logo + nav */}
        <div className="flex gap-[153px] items-start w-full">
          {/* Logo */}
          <div className="h-[146.69px] overflow-hidden relative w-[448px] shrink-0">
            <div className="absolute h-[146.2px] left-[137.4px] top-0 w-[310.6px]">
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgGroup} />
            </div>
            <div className="absolute h-[112.6px] left-0 top-[33.6px] w-[86.5px]">
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={imgGroup1} />
            </div>
          </div>

          {/* Menu columns */}
          <div className="flex gap-8 items-start font-normal">
            {[
              {
                heading: 'Jozu',
                links: ['Product', 'Pricing', 'Case Study', 'Company', 'News'],
              },
              {
                heading: 'KitOps',
                links: ['Install KitOps', 'KitOps Docs', 'KitOps Support', 'Champions'],
              },
              {
                heading: 'Resources',
                links: ['Blog', 'Support', 'Contact us'],
              },
            ].map((col) => (
              <div key={col.heading} className="flex flex-col gap-8 items-start w-[208px]">
                <span className="font-mono text-[#9b9b9b] text-xs leading-4">{col.heading}</span>
                <div className="flex flex-col gap-6 items-start text-white text-base leading-6 w-full">
                  {col.links.map((link) => (
                    <span key={link} className="cursor-pointer hover:text-[#2cfecc] transition-colors">{link}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: badges + sub-menu */}
        <div className="flex flex-col gap-12 items-start w-full">
          <div className="flex gap-8 items-center">
            <div className="relative size-24 overflow-hidden">
              <img
                alt="Awardable"
                className="absolute w-[179.3%] h-[179.3%] max-w-none"
                style={{ left: '-39.66%', top: '-39.66%' }}
                src={img13AwardableLogo}
              />
            </div>
            <div className="h-9 w-[132px] relative">
              <img alt="CNCF Silver Member" className="absolute inset-0 w-full h-full object-contain" src={imgCncfMemberSilver} />
            </div>
          </div>

          <div className="flex gap-12 items-center text-base leading-6 font-normal">
            <span className="text-[#9b9b9b]">Copyright © 2025 Jozu</span>
            <span className="text-white cursor-pointer">Privacy</span>
            <span className="text-white cursor-pointer">Terms &amp; Conditions</span>
            <span className="text-white cursor-pointer">POC Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main Page ─── */
export default function TradewindsPage() {
  return (
    <div className="bg-black flex flex-col items-center w-full min-h-screen">
      <NavBar />
      <HeroSection />
      <WhySection />
      <SecureGovSection />
      <DefenseEnvironmentsSection />
      <EvaluatorsSection />
      <ProvenSection />
      <MarketplaceCTASection />
      <TaglineBanner />
      <TradewindsFooter />
    </div>
  )
}
