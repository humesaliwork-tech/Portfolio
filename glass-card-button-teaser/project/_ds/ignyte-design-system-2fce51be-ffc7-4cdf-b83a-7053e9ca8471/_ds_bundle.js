/* @ds-bundle: {"format":4,"namespace":"IgnyteDesignSystem_2fce51","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"CtaBanner","sourcePath":"ui_kits/website/CtaBanner.jsx"},{"name":"Footer","sourcePath":"ui_kits/website/CtaBanner.jsx"},{"name":"DashboardPreview","sourcePath":"ui_kits/website/DashboardPreview.jsx"},{"name":"FrameworksSection","sourcePath":"ui_kits/website/FrameworksSection.jsx"},{"name":"Hero","sourcePath":"ui_kits/website/Hero.jsx"},{"name":"Nav","sourcePath":"ui_kits/website/Nav.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"109d6e0e30b5","components/core/Button.jsx":"7a025f2483f6","components/core/Card.jsx":"2cbdda7f939e","components/core/Tag.jsx":"30fe00f52186","components/feedback/Toast.jsx":"3f0fc927c275","components/feedback/Tooltip.jsx":"b69e59c0effe","components/forms/Checkbox.jsx":"f370ee479b33","components/forms/Input.jsx":"b101c0a0182b","components/forms/Radio.jsx":"2740f5614be7","components/forms/Select.jsx":"b3cac0584ea5","components/forms/Switch.jsx":"c6e4b8f6e859","components/navigation/Tabs.jsx":"02690cdf596c","components/overlay/Dialog.jsx":"7be2411b2525","ui_kits/website/CtaBanner.jsx":"ca2f61d871f6","ui_kits/website/DashboardPreview.jsx":"35a033aeb2a1","ui_kits/website/FrameworksSection.jsx":"833ac8cd0d77","ui_kits/website/Hero.jsx":"95fa20d405d2","ui_kits/website/Nav.jsx":"9b0021033396"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.IgnyteDesignSystem_2fce51 = window.IgnyteDesignSystem_2fce51 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'neutral',
  size = 'md'
}) {
  const tones = {
    neutral: {
      background: 'var(--color-bg-muted)',
      color: 'var(--color-fg-primary)'
    },
    accent: {
      background: 'var(--color-accent-subtle)',
      color: 'var(--ignyte-grey-900)'
    },
    success: {
      background: '#e6f3ec',
      color: 'var(--color-success)'
    },
    warning: {
      background: 'var(--color-accent-subtle)',
      color: 'var(--ignyte-grey-900)'
    },
    danger: {
      background: '#fbe9e6',
      color: 'var(--color-danger)'
    },
    inverse: {
      background: 'rgba(255,255,255,0.12)',
      color: '#fff'
    }
  };
  const sizes = {
    sm: {
      padding: '2px 8px',
      fontSize: 'var(--text-2xs)'
    },
    md: {
      padding: '4px 10px',
      fontSize: 'var(--text-xs)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-semibold)',
      borderRadius: 'var(--radius-sm)',
      letterSpacing: 'var(--tracking-normal)',
      ...tones[tone],
      ...sizes[size]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizeStyles = {
  sm: {
    padding: '6px 14px',
    fontSize: 'var(--text-xs)',
    gap: 6
  },
  md: {
    padding: '10px 20px',
    fontSize: 'var(--text-sm)',
    gap: 8
  },
  lg: {
    padding: '14px 26px',
    fontSize: 'var(--text-md)',
    gap: 8
  }
};
function variantStyle(variant) {
  switch (variant) {
    case 'secondary':
      return {
        background: 'var(--color-bg-surface)',
        color: 'var(--color-fg-primary)',
        border: '1.5px solid var(--color-border-strong)'
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--color-fg-primary)',
        border: '1.5px solid transparent'
      };
    case 'inverse':
      return {
        background: 'var(--ignyte-white)',
        color: 'var(--ignyte-grey-900)',
        border: '1.5px solid transparent'
      };
    case 'primary':
    default:
      return {
        background: 'var(--color-accent)',
        color: 'var(--color-fg-on-accent)',
        border: '1.5px solid transparent'
      };
  }
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  disabled = false,
  full = false,
  onClick,
  type = 'button'
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-semibold)',
    letterSpacing: 'var(--tracking-normal)',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    width: full ? '100%' : 'auto',
    transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
    ...sizeStyles[size],
    ...variantStyle(variant)
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: base,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, icon && iconPosition === 'left' && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex'
    }
  }, icon), children, icon && iconPosition === 'right' && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex'
    }
  }, icon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padding = 'lg',
  hoverable = false,
  style = {}
}) {
  const paddings = {
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding: paddings[padding],
      transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
      ...style
    },
    onMouseEnter: e => {
      if (hoverable) {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }
    },
    onMouseLeave: e => {
      if (hoverable) {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove,
  selected = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--text-xs)',
      padding: '5px 10px',
      borderRadius: 'var(--radius-full)',
      border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-border-default)'}`,
      background: selected ? 'var(--color-accent-subtle)' : 'var(--color-bg-surface)',
      color: 'var(--color-fg-primary)'
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--color-fg-secondary)',
      fontSize: '13px',
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const toneAccent = {
  info: 'var(--ignyte-grey-500)',
  success: 'var(--color-success)',
  warning: 'var(--color-accent-hover)',
  danger: 'var(--color-danger)'
};
function Toast({
  tone = 'info',
  title,
  description,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      background: 'var(--ignyte-grey-900)',
      color: '#fff',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-body)',
      maxWidth: 360,
      borderLeft: `3px solid ${toneAccent[tone]}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-sm)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontSize: 'var(--text-xs)',
      color: 'rgba(255,255,255,0.7)'
    }
  }, description)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,0.6)',
      cursor: 'pointer',
      fontSize: 14
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  label,
  position = 'top'
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    }
  }[position];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      ...pos,
      background: 'var(--ignyte-grey-900)',
      color: '#fff',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-fg-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: 'none',
      borderRadius: 'var(--radius-sm)',
      border: `1.5px solid ${checked ? 'var(--color-accent-hover)' : 'var(--color-border-strong)'}`,
      background: checked ? 'var(--color-accent)' : 'var(--color-bg-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "9",
    viewBox: "0 0 11 9",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 4.5L4 7.5L10 1",
    stroke: "var(--ignyte-grey-900)",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  type = 'text',
  disabled = false,
  icon = null
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 6,
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--color-fg-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      display: 'flex',
      color: 'var(--color-fg-muted)'
    }
  }, icon), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    style: {
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      padding: icon ? '10px 12px 10px 36px' : '10px 12px',
      borderRadius: 'var(--radius-md)',
      border: `1.5px solid ${error ? 'var(--color-danger)' : 'var(--color-border-default)'}`,
      outline: 'none',
      background: disabled ? 'var(--color-bg-muted)' : 'var(--color-bg-surface)',
      color: 'var(--color-fg-primary)',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)'
    },
    onFocus: e => {
      e.target.style.borderColor = 'var(--color-accent-hover)';
      e.target.style.boxShadow = 'var(--shadow-focus)';
    },
    onBlur: e => {
      e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-border-default)';
      e.target.style.boxShadow = 'none';
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontSize: 'var(--text-2xs)',
      color: error ? 'var(--color-danger)' : 'var(--color-fg-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  name,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-fg-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: 'none',
      borderRadius: '50%',
      border: `1.5px solid ${checked ? 'var(--color-accent-hover)' : 'var(--color-border-strong)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--color-accent)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      display: 'none'
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  value,
  onChange,
  options = [],
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 6,
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--color-fg-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: value,
    disabled: disabled,
    onChange: onChange,
    style: {
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--color-border-default)',
      background: disabled ? 'var(--color-bg-muted)' : 'var(--color-bg-surface)',
      color: 'var(--color-fg-primary)',
      outline: 'none'
    }
  }, options.map(opt => /*#__PURE__*/React.createElement("option", {
    key: opt.value,
    value: opt.value
  }, opt.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  disabled = false,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange({
      target: {
        checked: !checked
      }
    }),
    style: {
      width: 36,
      height: 20,
      borderRadius: 'var(--radius-full)',
      flex: 'none',
      background: checked ? 'var(--color-accent)' : 'var(--ignyte-grey-300)',
      position: 'relative',
      transition: 'background var(--duration-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-base) var(--ease-standard)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const {
  useState
} = React;
function Tabs({
  tabs = [],
  defaultActive = 0
}) {
  const [active, setActive] = useState(defaultActive);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1.5px solid var(--color-border-default)'
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t.label,
    onClick: () => setActive(i),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: '10px 16px',
      fontSize: 'var(--text-sm)',
      fontWeight: i === active ? 'var(--weight-semibold)' : 'var(--weight-medium)',
      color: i === active ? 'var(--color-fg-primary)' : 'var(--color-fg-secondary)',
      borderBottom: i === active ? '2px solid var(--color-accent)' : '2px solid transparent',
      marginBottom: -1.5,
      transition: 'color var(--duration-fast) var(--ease-standard)'
    }
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 4px'
    }
  }, tabs[active] && tabs[active].content));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  actions
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(26,26,28,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      maxWidth: '90%',
      background: '#fff',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      color: 'var(--color-fg-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontSize: 18,
      color: 'var(--color-fg-secondary)'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--color-fg-secondary)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 20
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CtaBanner.jsx
try { (() => {
function CtaBanner({
  onOpenDemo
}) {
  const {
    Button
  } = window.IgnyteDesignSystem_2fce51;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '72px 32px',
      background: 'var(--color-accent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-2xl)',
      color: 'var(--ignyte-grey-900)',
      margin: 0
    }
  }, "Ready to move ten times faster?"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onOpenDemo
  }, "Book a demo")));
}
function Footer() {
  const cols = [{
    title: 'Platform',
    links: ['Controls', 'Evidence', 'Reporting', 'Integrations']
  }, {
    title: 'Frameworks',
    links: ['CMMC', 'FedRAMP', 'ISO 27001', 'HITRUST']
  }, {
    title: 'Company',
    links: ['About', 'Careers', 'Contact']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ignyte-grey-900)',
      color: 'rgba(255,255,255,0.6)',
      padding: '56px 32px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 40,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/ignyte-wordmark-white.svg",
    alt: "Ignyte",
    style: {
      height: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 64
    }
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 'var(--text-xs)',
      color: '#fff',
      marginBottom: 12
    }
  }, c.title), c.links.map(l => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      margin: '8px 0'
    }
  }, l)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.12)',
      paddingTop: 20,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)'
    }
  }, "\xA9 2026 Ignyte Assurance Platform. All rights reserved.")));
}
Object.assign(__ds_scope, { CtaBanner, Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CtaBanner.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/DashboardPreview.jsx
try { (() => {
function DashboardPreview() {
  const {
    Tabs,
    Badge
  } = window.IgnyteDesignSystem_2fce51;
  const rows = [{
    name: 'Access Control — AC.L2-3.1.1',
    status: 'Implemented',
    tone: 'success'
  }, {
    name: 'Incident Response — IR.L2-3.6.1',
    status: 'In progress',
    tone: 'accent'
  }, {
    name: 'Audit Logging — AU.L2-3.3.2',
    status: 'Overdue',
    tone: 'danger'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '80px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      color: 'var(--color-fg-primary)',
      marginBottom: 12
    }
  }, "Real-time compliance dashboards."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      color: 'var(--color-fg-secondary)',
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--leading-relaxed)',
      maxWidth: 460
    }
  }, "Cross-mapped frameworks, automated evidence collection, and audit-ready reporting \u2014 visible to your whole team the moment it changes.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      borderBottom: '1px solid var(--color-border-default)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, "CMMC L2 Program"), /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "86% ready")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 20px'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      label: 'Controls',
      content: /*#__PURE__*/React.createElement("div", null, rows.map(r => /*#__PURE__*/React.createElement("div", {
        key: r.name,
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0',
          borderBottom: '1px solid var(--color-border-default)',
          fontSize: 'var(--text-sm)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--color-fg-primary)'
        }
      }, r.name), /*#__PURE__*/React.createElement(Badge, {
        tone: r.tone
      }, r.status))))
    }, {
      label: 'Evidence',
      content: /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-sm)',
          color: 'var(--color-fg-secondary)',
          padding: '10px 0'
        }
      }, "128 artifacts collected \xB7 12 pending review")
    }]
  })))));
}
Object.assign(__ds_scope, { DashboardPreview });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/DashboardPreview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FrameworksSection.jsx
try { (() => {
const frameworks = [{
  name: 'CMMC 2.0',
  desc: 'Defense Industrial Base certification, cross-mapped to NIST 800-171.',
  tag: 'Defense'
}, {
  name: 'FedRAMP',
  desc: 'Authorize cloud offerings for federal agencies with automated evidence.',
  tag: 'Federal'
}, {
  name: 'ISO 27001',
  desc: 'Certify your ISMS with continuous control monitoring.',
  tag: 'Global'
}, {
  name: 'HITRUST',
  desc: 'Manage HITRUST CSF assessments in one collaborative workspace.',
  tag: 'Healthcare'
}];
function FrameworksSection() {
  const {
    Card,
    Badge
  } = window.IgnyteDesignSystem_2fce51;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '80px 32px',
      background: 'var(--color-bg-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      color: 'var(--color-fg-primary)',
      marginBottom: 8
    }
  }, "One platform, every framework."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      color: 'var(--color-fg-secondary)',
      fontSize: 'var(--text-md)',
      marginBottom: 40,
      maxWidth: 560
    }
  }, "Cross-map controls once and reuse the evidence everywhere."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20
    }
  }, frameworks.map(f => /*#__PURE__*/React.createElement(Card, {
    key: f.name,
    hoverable: true
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, f.tag), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      margin: '14px 0 8px',
      color: 'var(--color-fg-primary)'
    }
  }, f.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-fg-secondary)',
      lineHeight: 'var(--leading-normal)'
    }
  }, f.desc))))));
}
Object.assign(__ds_scope, { FrameworksSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FrameworksSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
function Hero({
  onOpenDemo
}) {
  const {
    Button,
    Badge
  } = window.IgnyteDesignSystem_2fce51;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--ignyte-grey-900)',
      color: '#fff',
      padding: '96px 32px 110px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/ignyte-star-mark@2x.png",
    alt: "",
    style: {
      position: 'absolute',
      right: -120,
      top: -60,
      width: 480,
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "inverse"
  }, "GRC \xB7 Audit Automation \xB7 AI-Enabled"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      letterSpacing: 'var(--tracking-tight)',
      fontSize: 'var(--text-4xl)',
      lineHeight: 'var(--leading-tight)',
      margin: '20px 0 20px',
      maxWidth: 620
    }
  }, "Get certified in months, not years."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'rgba(255,255,255,0.72)',
      maxWidth: 520,
      margin: '0 0 32px'
    }
  }, "Ignyte combines an automated GRC platform with former DoD assessors to move you through CMMC, FedRAMP, ISO 27001, and HITRUST \u2014 faster, and with near real-time transparency."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onOpenDemo
  }, "Book a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse"
  }, "See the platform"))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
function Nav({
  onOpenDemo
}) {
  const {
    Button
  } = window.IgnyteDesignSystem_2fce51;
  const [open, setOpen] = React.useState(false);
  const links = ['Platform', 'Frameworks', 'Services', 'Resources', 'Pricing'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: '1px solid var(--color-border-default)',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/ignyte-wordmark-black.svg",
    alt: "Ignyte",
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      color: 'var(--color-fg-primary)',
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onOpenDemo
  }, "Book a demo"))));
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.CtaBanner = __ds_scope.CtaBanner;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.DashboardPreview = __ds_scope.DashboardPreview;

__ds_ns.FrameworksSection = __ds_scope.FrameworksSection;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.Nav = __ds_scope.Nav;

})();
