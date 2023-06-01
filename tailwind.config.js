module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Obvia", "sans-serif"],
        cy: ["Cy", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: "cy",
            },
            h2: {
              fontFamily: "cy",
            },
            h3: {
              fontFamily: "cy",
            },
            h4: {
              fontFamily: "cy",
            },
            h5: {
              fontFamily: "cy",
            },
            h6: {
              fontFamily: "cy",
            },
            a: {
              fontFamily: "obvia",
            },
            "ol li:before": {
              fontFamily: "obvia",
            },
            "ul li:before": {
              fontFamily: "obvia",
            },
            p: {
              fontFamily: "obvia",
            },
            button: {
              fontFamily: "cy",
            },
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FC4E26",

          secondary: "#2216fc",

          accent: "#df32ef",

          neutral: "#2c2c20",

          "base-100": "#EEEEE7",

          info: "#6861ca",

          success: "#75e1a4",

          warning: "#EFC03E",

          error: "#F60E3C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
