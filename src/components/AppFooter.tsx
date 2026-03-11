import { Facebook, Instagram, Linkedin, MessageCircle, PhoneCall } from "lucide-react";
import { PHONE_LINK, PHONE_NUMBER, type SocialKey, visibleSocials } from "@/config/socials";

const socialIcons: Partial<Record<SocialKey, typeof Instagram>> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
};

export function AppFooter() {
  const socials = visibleSocials().filter((social) =>
    ["instagram", "facebook", "linkedin", "whatsapp"].includes(social.key)
  );

  return (
    <footer className="app-frame pt-0">
      <div className="rounded-3xl border border-border/70 bg-card/80 px-4 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-label">Contact</p>
            <p className="mt-2 text-sm text-muted-foreground">Reach out through phone or social links.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/35 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <PhoneCall className="w-4 h-4" />
              {PHONE_NUMBER}
            </a>

            {socials.map((social) => {
              const Icon = socialIcons[social.key];
              if (!Icon) return null;

              return (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-secondary/35 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  title={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
