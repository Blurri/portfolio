/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    categories: Category;
    technologies: Technology;
    experience: Experience;
    'page-content': PageContent;
    projects: Project;
    testimonials: Testimonial;
    media: Media;
    settings: Setting;
    'social-links': SocialLink;
    users: User;
    contact: Contact;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    technologies: TechnologiesSelect<false> | TechnologiesSelect<true>;
    experience: ExperienceSelect<false> | ExperienceSelect<true>;
    'page-content': PageContentSelect<false> | PageContentSelect<true>;
    projects: ProjectsSelect<false> | ProjectsSelect<true>;
    testimonials: TestimonialsSelect<false> | TestimonialsSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    settings: SettingsSelect<false> | SettingsSelect<true>;
    'social-links': SocialLinksSelect<false> | SocialLinksSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    contact: ContactSelect<false> | ContactSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  name: string;
  /**
   * Used to determine the display order of categories
   */
  order?: number | null;
  /**
   * Technologies that belong to this category
   */
  technologies?: (number | Technology)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "technologies".
 */
export interface Technology {
  id: number;
  name: string;
  /**
   * Years of experience with this technology
   */
  years: number;
  /**
   * The category this technology belongs to
   */
  category: number | Category;
  /**
   * Used to determine the display order within a category
   */
  order?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experience".
 */
export interface Experience {
  id: number;
  /**
   * Name of the company or organization
   */
  company: string;
  /**
   * Job title or position held
   */
  title: string;
  /**
   * When this position started
   */
  startDate: string;
  /**
   * When this position ended (leave blank if current)
   */
  endDate?: string | null;
  /**
   * Check if this is your current position
   */
  current?: boolean | null;
  /**
   * Description of responsibilities and achievements
   */
  description: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  /**
   * Technologies used in this role
   */
  technologies?: (number | Technology)[] | null;
  /**
   * Projects completed during this role
   */
  projects?: (number | Project)[] | null;
  /**
   * Display order (lower numbers appear first)
   */
  order?: number | null;
  /**
   * Logo of the company or organization
   */
  companyLogo?: (number | null) | Media;
  /**
   * Key achievements or responsibilities
   */
  highlights?:
    | {
        highlight: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: number;
  title: string;
  /**
   * URL-friendly identifier (e.g., "my-awesome-project")
   */
  slug: string;
  status: 'draft' | 'in-progress' | 'completed' | 'published' | 'archived';
  projectType: 'web-app' | 'mobile-app' | 'desktop-app' | 'api' | 'library' | 'game' | 'other';
  /**
   * Brief summary of the project (1-2 sentences)
   */
  summary: string;
  /**
   * Full description of the project
   */
  description: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  /**
   * Main image for the project
   */
  featuredImage?: (number | null) | Media;
  /**
   * Additional images for the project
   */
  gallery?:
    | {
        image: number | Media;
        caption?: string | null;
        id?: string | null;
      }[]
    | null;
  /**
   * Technologies used in this project
   */
  technologies?: (number | Technology)[] | null;
  /**
   * Links to the project (live site, repository, etc.)
   */
  links?:
    | {
        type: 'live' | 'github' | 'docs' | 'demo' | 'other';
        url: string;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  /**
   * Feature this project on the homepage
   */
  featured?: boolean | null;
  /**
   * Display order (lower numbers appear first)
   */
  order?: number | null;
  /**
   * When the project was started
   */
  startDate?: string | null;
  /**
   * When the project was completed
   */
  completedDate?: string | null;
  /**
   * Code snippets to showcase
   */
  codeSnippets?:
    | {
        title: string;
        language:
          | 'javascript'
          | 'typescript'
          | 'html'
          | 'css'
          | 'python'
          | 'java'
          | 'csharp'
          | 'php'
          | 'ruby'
          | 'go'
          | 'swift'
          | 'kotlin'
          | 'rust'
          | 'other';
        code: string;
        description?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  /**
   * Alternative text for screen readers and SEO
   */
  alt: string;
  /**
   * Optional caption for the image
   */
  caption?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "page-content".
 */
export interface PageContent {
  id: number;
  /**
   * Name of this content block (for admin reference)
   */
  title: string;
  /**
   * Unique identifier for this content block (e.g., "home-hero")
   */
  slug: string;
  /**
   * Which section of the site this content belongs to
   */
  section: 'home' | 'about' | 'features' | 'contact' | 'global';
  /**
   * Main content for this section
   */
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  /**
   * Optional subtitle or tagline
   */
  subtitle?: string | null;
  /**
   * Optional image for this content block
   */
  image?: (number | null) | Media;
  /**
   * Optional call-to-action button
   */
  callToAction?: {
    /**
     * Button text
     */
    text?: string | null;
    /**
     * URL or path the button links to
     */
    link?: string | null;
    /**
     * Visual style of the button
     */
    style?: ('primary' | 'secondary' | 'tertiary') | null;
  };
  /**
   * Display order within the section (lower numbers appear first)
   */
  order?: number | null;
  /**
   * SEO metadata for this content
   */
  metadata?: {
    /**
     * Custom page title for SEO
     */
    metaTitle?: string | null;
    /**
     * Custom page description for SEO
     */
    metaDescription?: string | null;
    /**
     * Comma-separated keywords for SEO
     */
    keywords?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "testimonials".
 */
export interface Testimonial {
  id: number;
  /**
   * Name of the person giving the testimonial
   */
  name: string;
  /**
   * Company or organization the person represents
   */
  company?: string | null;
  /**
   * Job title or position of the person
   */
  title?: string | null;
  /**
   * The testimonial text
   */
  quote: string;
  /**
   * Photo of the person (optional)
   */
  image?: (number | null) | Media;
  /**
   * Feature this testimonial prominently on the site
   */
  featured?: boolean | null;
  /**
   * Related project (if applicable)
   */
  project?: (number | null) | Project;
  /**
   * Display order (lower numbers appear first)
   */
  order?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings".
 */
export interface Setting {
  id: number;
  /**
   * Name for this settings document
   */
  name: string;
  /**
   * Main site title
   */
  siteTitle: string;
  /**
   * Brief description of the site
   */
  siteDescription?: string | null;
  /**
   * Site logo settings
   */
  logo?: {
    /**
     * Logo for dark mode
     */
    dark?: (number | null) | Media;
    /**
     * Logo for light mode
     */
    light?: (number | null) | Media;
    /**
     * Site favicon (should be square)
     */
    favicon?: (number | null) | Media;
  };
  /**
   * Main navigation links
   */
  mainNavigation?:
    | {
        /**
         * Navigation label
         */
        label: string;
        /**
         * URL or path
         */
        link: string;
        /**
         * Open in new tab
         */
        newTab?: boolean | null;
        /**
         * Display order
         */
        order?: number | null;
        id?: string | null;
      }[]
    | null;
  /**
   * Footer navigation links
   */
  footerNavigation?:
    | {
        /**
         * Navigation label
         */
        label: string;
        /**
         * URL or path
         */
        link: string;
        /**
         * Open in new tab
         */
        newTab?: boolean | null;
        id?: string | null;
      }[]
    | null;
  /**
   * Site color settings
   */
  colors?: {
    /**
     * Primary color (hex code)
     */
    primary?: string | null;
    /**
     * Secondary color (hex code)
     */
    secondary?: string | null;
    /**
     * Accent color (hex code)
     */
    accent?: string | null;
  };
  /**
   * Global SEO settings
   */
  seo?: {
    /**
     * Default meta title
     */
    metaTitle?: string | null;
    /**
     * Default meta description
     */
    metaDescription?: string | null;
    /**
     * Default social sharing image
     */
    ogImage?: (number | null) | Media;
    /**
     * Default meta keywords
     */
    keywords?: string | null;
  };
  /**
   * Analytics settings
   */
  analytics?: {
    /**
     * Google Analytics ID
     */
    googleAnalyticsId?: string | null;
    /**
     * Google Tag Manager ID
     */
    googleTagManagerId?: string | null;
  };
  /**
   * Contact information
   */
  contactInfo?: {
    /**
     * Primary contact email
     */
    email?: string | null;
    /**
     * Contact phone number
     */
    phone?: string | null;
    /**
     * Physical address (if applicable)
     */
    address?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-links".
 */
export interface SocialLink {
  id: number;
  /**
   * Social media platform
   */
  platform:
    | 'github'
    | 'linkedin'
    | 'twitter'
    | 'instagram'
    | 'youtube'
    | 'medium'
    | 'devto'
    | 'stackoverflow'
    | 'codepen'
    | 'website'
    | 'other';
  /**
   * If "Other" is selected above, specify the platform name
   */
  customPlatform?: string | null;
  /**
   * Full URL to your profile (including https://)
   */
  url: string;
  /**
   * Icon to display for this link
   */
  icon?: ('default' | 'custom') | null;
  /**
   * Upload a custom icon (SVG preferred)
   */
  customIcon?: (number | null) | Media;
  /**
   * Display name for this link (optional)
   */
  displayName?: string | null;
  /**
   * Your username on this platform (optional)
   */
  username?: string | null;
  /**
   * Whether this link is active and should be displayed
   */
  active?: boolean | null;
  /**
   * Display order (lower numbers appear first)
   */
  order?: number | null;
  /**
   * Feature this link prominently
   */
  featured?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  role: 'admin' | 'editor' | 'viewer';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact".
 */
export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  /**
   * Status of this contact request
   */
  status?: ('new' | 'in-progress' | 'completed' | 'archived') | null;
  /**
   * Internal notes about this contact request
   */
  notes?: string | null;
  /**
   * Where this contact request came from (e.g., "contact form", "email")
   */
  source?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'categories';
        value: number | Category;
      } | null)
    | ({
        relationTo: 'technologies';
        value: number | Technology;
      } | null)
    | ({
        relationTo: 'experience';
        value: number | Experience;
      } | null)
    | ({
        relationTo: 'page-content';
        value: number | PageContent;
      } | null)
    | ({
        relationTo: 'projects';
        value: number | Project;
      } | null)
    | ({
        relationTo: 'testimonials';
        value: number | Testimonial;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'settings';
        value: number | Setting;
      } | null)
    | ({
        relationTo: 'social-links';
        value: number | SocialLink;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'contact';
        value: number | Contact;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  name?: T;
  order?: T;
  technologies?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "technologies_select".
 */
export interface TechnologiesSelect<T extends boolean = true> {
  name?: T;
  years?: T;
  category?: T;
  order?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "experience_select".
 */
export interface ExperienceSelect<T extends boolean = true> {
  company?: T;
  title?: T;
  startDate?: T;
  endDate?: T;
  current?: T;
  description?: T;
  technologies?: T;
  projects?: T;
  order?: T;
  companyLogo?: T;
  highlights?:
    | T
    | {
        highlight?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "page-content_select".
 */
export interface PageContentSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  section?: T;
  content?: T;
  subtitle?: T;
  image?: T;
  callToAction?:
    | T
    | {
        text?: T;
        link?: T;
        style?: T;
      };
  order?: T;
  metadata?:
    | T
    | {
        metaTitle?: T;
        metaDescription?: T;
        keywords?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects_select".
 */
export interface ProjectsSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  status?: T;
  projectType?: T;
  summary?: T;
  description?: T;
  featuredImage?: T;
  gallery?:
    | T
    | {
        image?: T;
        caption?: T;
        id?: T;
      };
  technologies?: T;
  links?:
    | T
    | {
        type?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  featured?: T;
  order?: T;
  startDate?: T;
  completedDate?: T;
  codeSnippets?:
    | T
    | {
        title?: T;
        language?: T;
        code?: T;
        description?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "testimonials_select".
 */
export interface TestimonialsSelect<T extends boolean = true> {
  name?: T;
  company?: T;
  title?: T;
  quote?: T;
  image?: T;
  featured?: T;
  project?: T;
  order?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        card?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        tablet?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings_select".
 */
export interface SettingsSelect<T extends boolean = true> {
  name?: T;
  siteTitle?: T;
  siteDescription?: T;
  logo?:
    | T
    | {
        dark?: T;
        light?: T;
        favicon?: T;
      };
  mainNavigation?:
    | T
    | {
        label?: T;
        link?: T;
        newTab?: T;
        order?: T;
        id?: T;
      };
  footerNavigation?:
    | T
    | {
        label?: T;
        link?: T;
        newTab?: T;
        id?: T;
      };
  colors?:
    | T
    | {
        primary?: T;
        secondary?: T;
        accent?: T;
      };
  seo?:
    | T
    | {
        metaTitle?: T;
        metaDescription?: T;
        ogImage?: T;
        keywords?: T;
      };
  analytics?:
    | T
    | {
        googleAnalyticsId?: T;
        googleTagManagerId?: T;
      };
  contactInfo?:
    | T
    | {
        email?: T;
        phone?: T;
        address?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-links_select".
 */
export interface SocialLinksSelect<T extends boolean = true> {
  platform?: T;
  customPlatform?: T;
  url?: T;
  icon?: T;
  customIcon?: T;
  displayName?: T;
  username?: T;
  active?: T;
  order?: T;
  featured?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact_select".
 */
export interface ContactSelect<T extends boolean = true> {
  name?: T;
  email?: T;
  subject?: T;
  message?: T;
  status?: T;
  notes?: T;
  source?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}