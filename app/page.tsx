

// export default function Home() {
//   return (
//     <div className="container mx-auto p-4 md:p-0 justify-items-center px-4">
//       <h1 className="text-2xl font-bold mb-4 my-8">
//         Welcome to the Reconcile Agent
//       </h1>
//       <p className="text-gray-600 mb-8">
//         Reconcile Agent is a platform that helps you manage your finances.
//       </p>
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20vw] font-bold leading-none sm:text-[15vw] md:text-[12vw] lg:text-[10vw]">
//         <span className="bg-gradient-to-b from-gray-200 to-gray-100/30 to-80% bg-clip-text text-transparent -tracking-wide">
//           Reconcile•Agent
//         </span>
//         <span className="absolute inset-0 bg-gray-300/70 bg-clip-text text-transparent mix-blend-darken [text-shadow:0_1px_0_white] -tracking-wide">
//           Reconcile•Agent
//         </span>
//       </div>
      
//     </div>
//   );
// }
import Link from "next/link"
import {
  ArrowRight,
  BarChart2,
  Brain,
  CheckCircle,
  ChevronDown,
  FileSearch,
  FileText,
  FileWarning,
  Star,
  Upload,
  AlertCircle,
  BarChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans p-5">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold text-xl">
              <span className="text-primary">Reconcile Agent</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Log in
            </Link>
            <Button asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <span>AI-Powered Bank Reconciliation</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Automate Your Bank & Pos Reconciliation
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Stop spending hours manually reconciling bank statements with POS data. Our AI-powered platform
                    automatically identifies discrepancies and generates detailed reports in minutes, not days.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="h-12 px-8">
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    Watch demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                        <img
                          src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                          alt="User"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">1,500+</span> finance teams trust us
                  </div>
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    <span className="ml-1 font-medium">4.9/5</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-gradient-to-br from-gray-50 to-gray-100 p-2 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&h=720&q=80"
                    alt="Bank Reconciliation Dashboard"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <div className="h-12 w-12 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="border-y bg-gray-50 py-10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="text-xl font-medium text-muted-foreground">Trusted by finance teams worldwide</div>
              <div className="flex flex-wrap items-center justify-center gap-8 grayscale">
                {[
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
                ].map((logo, i) => (
                  <div key={i} className="h-8">
                    <img src={logo || "/placeholder.svg"} alt={`Company ${i}`} className="h-full w-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simplify your reconciliation process
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform automates the entire reconciliation workflow, from data extraction to report generation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {[
                {
                  title: "Easy File Upload",
                  description: "Upload your bank statement and POS data files separately in PDF or CSV format.",
                  icon: <FileText className="h-10 w-10" />,
                  image:
                    "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
                },
                {
                  title: "AI Data Extraction",
                  description: "Our AI automatically extracts transaction data from your files with high accuracy.",
                  icon: <FileSearch className="h-10 w-10" />,
                  image:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
                },
                {
                  title: "Discrepancy Detection",
                  description: "Instantly identify missing transactions, incorrect amounts, and other discrepancies.",
                  icon: <AlertCircle className="h-10 w-10" />,
                  image:
                    "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
                },
                {
                  title: "Detailed Reports",
                  description: "Generate comprehensive reports with actionable insights to resolve discrepancies.",
                  icon: <BarChart className="h-10 w-10" />,
                  image:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
                },
                {
                  title: "Secure Storage",
                  description: "All your files and reports are securely stored and easily accessible.",
                  icon: <CheckCircle className="h-10 w-10" />,
                  image:
                    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
                },
                {
                  title: "Automated Workflow",
                  description: "The entire process is automated, from file upload to report generation.",
                  icon: <ArrowRight className="h-10 w-10" />,
                  image:
                    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-lg border bg-white shadow-sm transition-all hover:shadow-md overflow-hidden"
                >
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col items-center space-y-4 p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-center text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gray-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Reconcile in 4 simple steps
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes bank reconciliation faster and more accurate than ever before.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: "1",
                    title: "Upload Your Files",
                    description:
                      "Upload your bank statement and POS data files separately. We support PDF and CSV formats.",
                    icon: <Upload className="h-12 w-12" />,
                  },
                  {
                    step: "2",
                    title: "AI Data Extraction",
                    description:
                      "Our AI automatically extracts transaction data, including dates, amounts, and descriptions.",
                    icon: <Brain className="h-12 w-12" />,
                  },
                  {
                    step: "3",
                    title: "Discrepancy Analysis",
                    description:
                      "The system compares the data sets and identifies discrepancies between your bank and POS records.",
                    icon: <FileWarning className="h-12 w-12" />,
                  },
                  {
                    step: "4",
                    title: "Report Generation",
                    description: "Receive a detailed report highlighting discrepancies with suggested solutions.",
                    icon: <BarChart2 className="h-12 w-12" />,
                  },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {step.icon}
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-500">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Screenshot Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Powerful Dashboard
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  See all your reconciliation data in one place
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our intuitive dashboard gives you a complete overview of your reconciliation status
                </p>
              </div>
            </div>
            <div className="rounded-xl border shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080&q=80"
                alt="ReconcileAI Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-gray-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What our customers say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Finance teams are saving hours every week with our reconciliation platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "We used to spend 15+ hours each month on reconciliation. With ReconcileAI, it takes less than an hour, and we catch discrepancies we would have missed.",
                  author: "Sarah Johnson",
                  role: "Finance Director at RetailCorp",
                  avatar: "https://randomuser.me/api/portraits/women/1.jpg",
                },
                {
                  quote:
                    "The AI extraction is incredibly accurate, even with our complex bank statements. It's saved our accounting team countless hours of manual data entry.",
                  author: "Michael Chen",
                  role: "CFO at GrowthTech",
                  avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                },
                {
                  quote:
                    "The detailed reports have helped us identify and fix systematic issues in our POS system that were causing reconciliation headaches for years.",
                  author: "Emily Rodriguez",
                  role: "Controller at FoodChain Inc.",
                  avatar: "https://randomuser.me/api/portraits/women/3.jpg",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between space-y-4 rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                        ))}
                    </div>
                    <p className="text-gray-500">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, transparent pricing
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business. All plans include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$49",
                  description: "Perfect for small businesses with basic reconciliation needs.",
                  features: [
                    "Up to 50 reconciliations per month",
                    "PDF & CSV file support",
                    "Basic discrepancy reports",
                    "7-day data retention",
                    "Email support",
                  ],
                  cta: "Start free trial",
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "$99",
                  description: "Ideal for growing businesses with regular reconciliation needs.",
                  features: [
                    "Up to 200 reconciliations per month",
                    "Advanced discrepancy detection",
                    "Detailed reports with insights",
                    "30-day data retention",
                    "Priority support",
                    "API access",
                    "Export to accounting software",
                  ],
                  cta: "Start free trial",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "$249",
                  description: "For large organizations with complex reconciliation requirements.",
                  features: [
                    "Unlimited reconciliations",
                    "Custom AI training for your formats",
                    "Advanced analytics dashboard",
                    "90-day data retention",
                    "24/7 dedicated support",
                    "Full API access",
                    "Custom integrations",
                    "Multi-user access",
                  ],
                  cta: "Contact sales",
                  popular: false,
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`flex flex-col rounded-xl border ${
                    plan.popular ? "border-primary bg-primary/5 shadow-lg" : "bg-white shadow-sm"
                  } p-6`}
                >
                  {plan.popular && (
                    <div className="mb-4 rounded-full bg-primary px-3 py-1 text-center text-xs font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-gray-500">/month</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <ul className="mb-6 flex-1 space-y-2">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "" : "bg-white-900 hover:bg-gray-100"}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-gray-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently asked questions
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our reconciliation platform.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl divide-y py-12">
              {[
                {
                  question: "What file formats do you support?",
                  answer:
                    "We currently support PDF and CSV formats for both bank statements and POS data files. Our AI is trained to extract data from a wide variety of bank statement formats and POS systems.",
                },
                {
                  question: "How accurate is the AI data extraction?",
                  answer:
                    "Our AI typically achieves 95-99% accuracy in data extraction, depending on the clarity and format of your files. The system continuously improves as it processes more of your specific file formats.",
                },
                {
                  question: "How long does the reconciliation process take?",
                  answer:
                    "Most reconciliations are completed within 1-2 minutes. Processing time may vary based on file size and complexity, but you'll receive a notification as soon as your report is ready.",
                },
                {
                  question: "Is my financial data secure?",
                  answer:
                    "Yes, we take security very seriously. All data is encrypted in transit and at rest. We use bank-level security protocols and do not store your actual bank credentials. Your data is only used for the reconciliation process.",
                },
                {
                  question: "Can I integrate with my accounting software?",
                  answer:
                    "Yes, our Professional and Enterprise plans include integration capabilities with popular accounting software like QuickBooks, Xero, and Sage. We also offer API access for custom integrations.",
                },
              ].map((faq, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-medium">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-gray-500">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to automate your reconciliation process?
                </h2>
                <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join hundreds of finance teams that save hours every week with our platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="h-12 bg-white text-primary hover:bg-white/90">
                  Start your free trial
                </Button>
                <Button size="lg" variant="outline" className="h-12 border-white text-primary hover:bg-gray/10">
                  Schedule a demo
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/60">No credit card required. 14-day free trial.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="font-semibold text-xl">
                <span className="text-primary">Reconcile Agent</span>
              </Link>
              <p className="text-sm text-gray-500">Automating bank and POS reconciliation with AI.</p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "linkedin", "github"].map((social) => (
                  <Link key={social} href={`#${social}`} className="text-gray-500 hover:text-primary">
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6 rounded-full bg-gray-200" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Integrations", "API", "Security"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider">Company</h3>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Press", "Partners"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2">
                {["Terms", "Privacy", "Cookies", "Compliance", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} ReconcileAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
