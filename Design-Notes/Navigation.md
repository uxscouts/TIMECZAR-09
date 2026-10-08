[TOP BAR]---------------------------------------------------------
Logo   Home  Tomato  Stats  Goals  Categories  Keywords   [Profile ▾]
                                                           │
                                                           ├─> Settings
                                                           └─> Logout

[MAIN CONTENT] Settings Page -------------------------------------
┌──────────────────┐ ┌───────────────────────────────────────────┐
│ ⚙️ Account       │ │ Email: user@email.com   [Change Email]    │
│ 🔒 Security      │ │ Password: •••••••••••   [Change Password] │
│                  │ │                                           │
│                  │ │ ⚠️ Danger Zone                             │
│                  │ │ [Delete Account]                          │
└──────────────────┘ └───────────────────────────────────────────┘

[FOOTER]----------------------------------------------------------
About  •  Contact  •  Privacy Policy

---------------------------------------------------

src/
└── pages/
    └── settings/
        ├─ SettingsLayout.jsx  # Sidebar navigation + common layout
        ├─ AccountSubPage.jsx  # Email, general info, Delete Account
        └─ SecuritySubPage.jsx # Password changes, 2FA
