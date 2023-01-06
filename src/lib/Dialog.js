/* eslint react/prop-types: 0 */

import { useEffect, useRef, useState } from 'react';

const useHover = (elementRef) => {
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    element.addEventListener('mouseenter', () => setHovered(true));
    element.addEventListener('mouseleave', () => setHovered(false));
  }, [elementRef]);

  return isHovered;
};

let all = [];

let id = 0;

const removeDialog = (id) => {
  all = all.filter((notice) => notice.id !== id);
};

const manager = (() => {
  let callback = null;

  return {
    subscribe: (cb) => {
      callback = cb;
    },
    unsubscribe: () => {
      callback = null;
    },
    remove: (id) => {
      removeDialog(id);
      if (callback) callback(all);
    },
    add: (element) => {
      id += 1;
      all = [...all, { id, element }];
      if (callback) callback(all);
      return {
        close: () => {
          removeDialog(id);
          if (callback) callback(all);
        },
      };
    },
  };
})();

const dialog = {
  show: (element) => manager.add(element),
};

const styles = {
  container: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 10000,
    background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
  },
  center: {
    backgroundColor: '#fff',
    maxWidth: '350px',
  },
  dialog: {
    padding: '15px',
    whiteSpace: 'pre-wrap',
    minWidth: '280px',
  },
  dialogTitle: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginBottom: '8px',
  },
  dialogPrompt: {
    marginBottom: '25px',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  dialogPromptSpan: {
    display: 'block',
  },
  dialogControls: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  blockTextInput: {
    display: 'block',
    width: '100%',
    border: '1px solid #ddd',
    backgroundColor: '#eee',
    padding: '7px 10px',
    marginBottom: '15px',
  },
  message: {
    textAlign: 'center',
    marginBottom: '15px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    padding: '0 10px 10px',
  },
  btn: (isDanger, isHovered, isFirst) => ({
    minWidth: '68px',
    color: '#fff',
    backgroundOrigin: 'border-box',
    border: 'none',
    fontSize: '14px',
    padding: '8px 16px',
    borderRadius: '4px',
    borderColor: 'transparent',
    borderWidth: '1px',
    outline: 'none',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    transition: 'all 0.3s ease',
    marginLeft: isFirst ? 0 : '15px',
    background: isDanger
      ? 'linear-gradient(180deg, #9e0606, #5e0505)'
      : 'linear-gradient(180deg, #135cbb, #0e2f5a)',
    boxShadow: isHovered ? '0 2px 4px 0 rgb(0 0 0 / 50%)' : '0 0 0 0 transparent',
  }),
};

export const ConfirmDialog = ({ prompt, onConfirm, onCancel }) => {
  const confirmBtn = useRef();
  const cancelBtn = useRef();
  const isConfirmHovered = useHover(confirmBtn);
  const isCancelHovered = useHover(cancelBtn);

  return (
    <div style={styles.dialog}>
      <h2 style={styles.dialogPrompt}>
        <span style={styles.dialogPromptSpan}>{prompt}</span>
        <span style={styles.dialogPromptSpan}>Do you wish to continue?</span>
      </h2>
      <div style={styles.dialogControls}>
        <button
          ref={confirmBtn}
          type="button"
          style={styles.btn(true, isConfirmHovered, true)}
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          ref={cancelBtn}
          type="button"
          style={styles.btn(false, isCancelHovered, false)}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export const MessageDialog = ({ message, onOK }) => {
  const okBtn = useRef();
  const isOkHovered = useHover(okBtn);

  return (
    <div style={styles.dialog}>
      <div style={styles.message}>{message}</div>
      <div style={styles.dialogControls}>
        <button
          ref={okBtn}
          type="button"
          style={styles.btn(true, isOkHovered, true)}
          onClick={onOK}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export const TextInputDialog = ({ prompt, onConfirm, onCancel }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const textInput = useRef(null);
  const confirmBtn = useRef();
  const cancelBtn = useRef();
  const isConfirmHovered = useHover(confirmBtn);
  const isCancelHovered = useHover(cancelBtn);

  const handleTextChange = ({ target: { value } }) => setText(value);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!text) {
      setError('Field cannot be empty!');
      textInput.current.focus();
      return false;
    }

    onConfirm(text);
    return false;
  };

  return (
    <form style={styles.dialog} onSubmit={handleSubmit}>
      {prompt ? (
        <h2 style={styles.dialogTitle}>{prompt}</h2>
      ) : null}
      {error ? (
        <div style={styles.error}>{error}</div>
      ) : null}
      <input ref={textInput} type="text" onChange={handleTextChange} style={styles.blockTextInput} />
      <div style={styles.dialogControls}>
        <button
          ref={confirmBtn}
          type="submit"
          style={styles.btn(true, isConfirmHovered, true)}
        >
          Confirm
        </button>
        <button
          ref={cancelBtn}
          type="button"
          style={styles.btn(false, isCancelHovered, false)}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const Dialog = () => {
  const [dialogs, setDialogs] = useState(all);

  useEffect(() => {
    manager.subscribe((dialogs) => setDialogs(dialogs));
    return () => manager.unsubscribe();
  });

  if (dialogs.length <= 0) return <></>;

  return (
    <div style={styles.container}>
      {dialogs.map((dialog) => (
        <div key={dialog.id} style={styles.center}>
          {dialog.element}
        </div>
      ))}
    </div>
  );
};

export const useDialog = () => dialog;

export const useConfirmDialog = () => ({
  show: (prompt, onConfirm) => {
    let popup;

    const handleClose = () => popup.close();

    const handleConfirm = () => {
      popup.close();
      onConfirm();
    };

    popup = dialog.show(
      <ConfirmDialog prompt={prompt} onConfirm={handleConfirm} onCancel={handleClose} />,
    );
  },
});

export const useMessageDialog = () => ({
  show: (message) => {
    let popup;

    const handleClose = () => popup.close();

    popup = dialog.show(
      <MessageDialog message={message} onOK={handleClose} />,
    );
  },
});

export const useTextInputDialog = () => ({
  show: (prompt, onConfirm) => {
    let popup;

    const handleClose = () => popup.close();

    const handleConfirm = (result) => {
      popup.close();
      onConfirm(result);
    };

    popup = dialog.show(
      <TextInputDialog prompt={prompt} onConfirm={handleConfirm} onCancel={handleClose} />,
    );
  },
});

export default Dialog;
