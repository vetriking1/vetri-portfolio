import { useRef, memo, useCallback } from "react";
import { Mail, Github, Linkedin, Phone, MessageCircle, XIcon, Code2, Trophy } from "lucide-react";

const phoneNumber = "+919600718540";
const whatsappNumber = "919600718540";

const socialLinks = [
  { icon: Mail, href: "mailto:vetriselvan2005.11.18@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/vetriking1", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/vetri-selvan-m-790022254/", label: "LinkedIn" },
  { icon: Code2, href: "https://leetcode.com/u/Vetriselvan18/", label: "LeetCode" },
  { icon: Trophy, href: "https://www.hackerrank.com/profile/vking1060", label: "HackerRank" },
  { icon: XIcon, href: "https://x.com/VetKing0318?t=Pyfgr3nQXAiD9Z1n97ed4g&s=09", label: "X.com" },
];

const ContactSection = () => {
  const ref = useRef(null);

  const handleCall = useCallback(() => {
    window.location.href = `tel:${phoneNumber}`;
  }, []);

  const handleWhatsApp = useCallback(() => {
    window.open(`https://wa.me/${whatsappNumber}?text=Hi%20Vetri%20Selvan!%20I'd%20like%20to%20connect%20with%20you.`, "_blank");
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-4"
    >
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-0">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text-full">Let's Connect</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Have a project in mind or just want to chat? Drop me a message!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Actions */}
          <div className="space-y-6">
            {/* Call Me Button */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Call Me</h3>
                  <p className="text-muted-foreground">Let's talk directly</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Prefer a direct conversation? Give me a call and let's discuss your project or ideas.
              </p>
              <button
                onClick={handleCall}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/50 hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center gap-2 text-white">
                  <Phone className="w-5 h-5" />
                  {phoneNumber}
                </span>
              </button>
            </div>

            {/* WhatsApp Button */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-tertiary/10 via-primary/10 to-secondary/10 border border-tertiary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tertiary to-primary flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">WhatsApp Me</h3>
                  <p className="text-muted-foreground">Quick and easy messaging</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Send me a message on WhatsApp for instant communication. I'm always available to chat!
              </p>
              <button
                onClick={handleWhatsApp}
                className="w-full px-8 py-4 bg-gradient-to-r from-tertiary via-primary to-secondary rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-tertiary/50 hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center gap-2 text-white">
                  <MessageCircle className="w-5 h-5" />
                  Message on WhatsApp
                </span>
              </button>
            </div>


            {/* Availability Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-tertiary animate-pulse"></div>
                <span className="text-lg font-semibold">Available for Work</span>
              </div>
              <p className="text-muted-foreground">
                Currently accepting new projects and collaborations. Let's build
                something amazing together!
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Get in Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to reach out
                through any of the platforms below!
              </p>

              <div className="space-y-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted hover:bg-primary/10 border border-border hover:border-primary transition-colors duration-200"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-background" />
                      </div>
                      <span className="font-medium">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ContactSection);
