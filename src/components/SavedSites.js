import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  createSite,
  deleteSite,
  getSites,
  save,
} from '../services/storage';
import arrow from '../assets/images/play.png';
import deleteIcon from '../assets/images/delete.png';
import openIcon from '../assets/images/open.png';
import plusIcon from '../assets/images/plus-circle.png';
import ExpandableEntry from './ExpandableEntry';
import {
  addHeader,
  clearHeaders,
  selectMethod,
  selectRequestHeaders,
  selectUrl,
  setMethod,
  setUrl,
} from '../reducers/requestSlice';
import {
  resetForm,
  selectFormFields,
  setFormField,
} from '../reducers/formSlice';
import { useDialog, useConfirmDialog, useTextInputDialog } from '../lib/Dialog';
import { useNotification } from '../lib/Notification';
import { requestMethods } from '../utility';
import TabControl from '../containers/TabControl';

const methods = Object.values(requestMethods);

const btn = {
  backgroundColor: 'transparent',
  width: '22px',
  height: '22px',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

const img = {
  width: '22px',
  height: '22px',
  transition: 'all 0.3s linear',
};

const imgSm = {
  width: '16px',
  height: '16px',
  transition: 'all 0.3s linear',
};

const slider = {
  maxHeight: 0,
  transition: 'all 0.3s linear',
  overflow: 'hidden',
};

const styles = {
  container: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  h1: {
    margin: '0 0 10px 0',
    padding: '0 5px 5px',
    borderBottom: '1px dotted #eee',
    fontSize: '1.2rem',
  },
  hsm: {
    margin: '0 0 10px 0',
    padding: '0 5px 5px',
    borderBottom: '1px dotted #eee',
    fontSize: '0.9rem',
  },
  body: {
    flex: 1,
    overflow: 'auto',
    transition: 'all 0.3s linear',
  },
  formWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    padding: '10px',
    minWidth: '350px',
  },
  expandSiteBtn: {
    border: 'none',
    outline: 'none',
    display: 'block',
    color: 'inherit',
    padding: '5px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  sitePanel: {
    padding: '10px',
    border: '1px solid #eee',
  },
  sitePanelHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  siteRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  nameBtn: {
    cursor: 'pointer',
    flex: 1,
    padding: '5px',
    margin: '0 10px 0 0',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignitems: 'center',
    color: 'inherit',
  },
  btn,
  deleteBtn: {
    ...btn,
    marginLeft: '8px',
  },
  img,
  imgRot: {
    ...img,
    transform: 'rotate(90deg)',
  },
  imgSm,
  imgSmRot: {
    ...imgSm,
    transform: 'rotate(90deg)',
  },
  textInput: {
    display: 'block',
    width: '100%',
    padding: '7px 10px',
    border: '1px solid #eee',
    marginBottom: '15px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
    display: 'block',
    marginBottom: '3px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    padding: '0 10px 10px',
  },
  svg: {
    width: '24px',
    height: '24px',
  },
  select: {
    outline: 'none',
    margin: '0 0 15px',
    padding: '7px 0px',
    display: 'block',
    width: '100%',
  },
  slider,
  openSlider: {
    ...slider,
    maxHeight: '200px',
  },
  pagePanel: {
    marginBottom: '10px',
  },
  pageBody: {
    paddingTop: '2px',
  },
  pageEntries: {
    maxHeight: '100px',
    overflow: 'auto',
    padding: '5px',
  },
  pageEntriesControls: {
    padding: '4px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  saveCurrentBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: '0.7rem',
    padding: '5px',
  },
};

const KeyValueForm = ({
  title,
  keyLabel,
  valueLabel,
  onSubmit,
  onClose,
}) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = ({ target: { name, value } }) => {
    if (name === 'key') {
      setKey(value);
    } else if (name === 'value') {
      setValue(value);
    }
  };

  const submit = (evt) => {
    evt.preventDefault();

    if (!key) {
      setError(`${keyLabel} cannot be empty!`);
      return false;
    }

    if (!value) {
      setError(`${valueLabel} cannot be empty!`);
      return false;
    }

    onSubmit(key, value, setError);

    return false;
  };

  return (
    <form style={styles.form} onSubmit={submit}>
      <h2 style={styles.h1}>{title}</h2>
      {error ? <div style={styles.error}>{error}</div> : null}
      <span style={styles.label}>{keyLabel}</span>
      <input style={styles.textInput} type="text" name="key" value={key} onChange={handleTextChange} />
      <span style={styles.label}>{valueLabel}</span>
      <input style={styles.textInput} type="text" name="value" value={value} onChange={handleTextChange} />
      <div style={styles.controls}>
        <button type="submit" className="btn btn-blue">Save</button>
        <button type="button" onClick={onClose} className="btn btn-red ml-15px">
          Cancel
        </button>
      </div>
    </form>
  );
};

KeyValueForm.propTypes = {
  title: PropTypes.string,
  keyLabel: PropTypes.string,
  valueLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

KeyValueForm.defaultProps = {
  title: 'New Entry',
  keyLabel: 'Entry Key',
  valueLabel: 'Entry Label',
};

const PageForm = ({
  host,
  onSubmit,
  onClose,
}) => {
  const [path, setPath] = useState('');
  const [name, setName] = useState('');
  const [method, setMethod] = useState(methods[0]);
  const [error, setError] = useState('');

  const handleTextChange = ({ target: { name, value } }) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'path') {
      setPath(value);
    } else if (name === 'method') {
      setMethod(value);
    }
  };

  const submit = (evt) => {
    evt.preventDefault();

    if (!name) {
      setError('Name cannot be empty!');
      return false;
    }

    if (!path) {
      setError('Path cannot be empty!');
      return false;
    }

    if (!method) {
      setError('Method cannot be empty!');
      return false;
    }

    onSubmit(path, name, method, setError);

    return false;
  };

  return (
    <form style={styles.form} onSubmit={submit}>
      <h2 style={styles.hsm} className="ellipsis" title={host}>{`Host: ${host}`}</h2>
      {error ? <div style={styles.error}>{error}</div> : null}
      <span style={styles.label}>Path</span>
      <input style={styles.textInput} type="text" name="path" value={path} onChange={handleTextChange} />
      <span style={styles.label}>Name</span>
      <input style={styles.textInput} type="text" name="name" value={name} onChange={handleTextChange} />
      <span style={styles.label}>Method</span>
      <select style={styles.select} name="method" value={method} onChange={handleTextChange}>
        {methods.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <div style={styles.controls}>
        <button type="submit" className="btn btn-blue">Save</button>
        <button type="button" onClick={onClose} className="btn btn-red ml-15px">
          Cancel
        </button>
      </div>
    </form>
  );
};

PageForm.propTypes = {
  host: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const PagePanel = ({
  host,
  page,
  onRemove,
  onRefresh,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const dialog = useDialog();

  const toggleExpanded = () => setExpanded(!isExpanded);

  const removePage = () => onRemove(page);

  const open = () => {
    let url = host;
    if (!url.endsWith('/')) {
      url = `${url}/`;
    }

    let { path } = page;

    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    url = `${url}${path}`;

    dispatch(setUrl(url));
    dispatch(setMethod(page.method));
    dispatch(clearHeaders());
    dispatch(resetForm());
    Object.keys(page.body).forEach((key) => dispatch(
      setFormField({ key, value: page.body[key] }),
    ));
    Object.keys(page.headers).forEach((key) => dispatch(
      addHeader({ key, value: page.headers[key] }),
    ));
  };

  const addField = (mode) => {
    let dialogResult;

    const close = () => dialogResult.close();

    const handleSubmit = (key, value) => {
      let fields;
      if (mode === 'body') {
        fields = page.body;
      } else if (mode === 'headers') {
        fields = page.headers;
      } else {
        return;
      }

      fields[key] = value;
      save();
      onRefresh();
      close();
    };

    dialogResult = dialog.show(
      <KeyValueForm
        onSubmit={handleSubmit}
        onClose={close}
        title={`New ${mode === 'body' ? 'Form' : 'Header'} Field`}
      />,
    );
  };

  const handleAddBodyField = () => addField('body');

  const handleAddHeaderField = () => addField('headers');

  const handleRemoveBodyField = (key) => {
    const { body } = page;
    delete body[key];
    save();
    onRefresh();
  };

  const handleRemoveHeaderField = (key) => {
    const { headers } = page;
    delete headers[key];
    save();
    onRefresh();
  };

  return (
    <section className="mb-10px-clc">
      <div style={styles.siteRow}>
        <button type="button" style={styles.nameBtn} onClick={toggleExpanded}>
          <img src={arrow} alt="arrow" style={isExpanded ? styles.imgSmRot : styles.imgSm} className="mr-5px" />
          <span>{page.name}</span>
        </button>
        <button type="button" title="Open" onClick={open} style={styles.btn}>
          <img src={openIcon} alt="open" style={styles.img} />
        </button>
        <button type="button" title="Delete" onClick={removePage} style={styles.deleteBtn}>
          <img src={deleteIcon} alt="delete" style={styles.img} />
        </button>
      </div>
      <div style={isExpanded ? styles.openSlider : styles.slider}>
        <div style={styles.pageBody}>
          <TabControl
            activeHeader="Body"
            headers={['Body', 'Headers']}
            panelStyle={{ border: '1px solid #eee', borderTopWidth: 0 }}
            items={[
              <div key="body">
                <div style={styles.pageEntries}>
                  {Object.keys(page.body).map((k) => (
                    <ExpandableEntry
                      key={k}
                      entryKey={k}
                      value={page.body[k]}
                      onRemove={handleRemoveBodyField}
                    />
                  ))}
                </div>
                <div style={styles.pageEntriesControls}>
                  <button type="button" title="New Body Field" onClick={handleAddBodyField} style={styles.btn}>
                    <img src={plusIcon} alt="new" style={styles.img} />
                  </button>
                </div>
              </div>,
              <div key="headers">
                <div style={styles.pageEntries}>
                  {Object.keys(page.headers).map((k) => (
                    <ExpandableEntry
                      key={k}
                      entryKey={k}
                      value={page.headers[k]}
                      onRemove={handleRemoveHeaderField}
                    />
                  ))}
                </div>
                <div style={styles.pageEntriesControls}>
                  <button type="button" title="New Header Field" onClick={handleAddHeaderField} style={styles.btn}>
                    <img src={plusIcon} alt="new" style={styles.img} />
                  </button>
                </div>
              </div>,
            ]}
          />
        </div>
      </div>
    </section>
  );
};

PagePanel.propTypes = {
  host: PropTypes.string.isRequired,
  page: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    method: PropTypes.string,
    body: PropTypes.shape({}),
    headers: PropTypes.shape({}),
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

const SitePanel = ({
  site,
  isExpanded,
  onRefresh,
  onExpand,
}) => {
  const dialog = useDialog();
  const confirmDialog = useConfirmDialog();

  if (!isExpanded) {
    const setExpanded = () => onExpand(site.url);

    return (
      <button type="button" onClick={setExpanded} title={site.url} style={styles.expandSiteBtn}>
        {site.name}
      </button>
    );
  }

  const collapse = () => onExpand(false);

  const removeSite = () => {
    confirmDialog.show(`The site ${site.name} will be permanently deleted!`, () => {
      if (deleteSite(site.url)) {
        onRefresh();
      }
    });
  };

  const removePage = (page) => {
    confirmDialog.show(`Page ${page.name} will be permanently removed!`, () => {
      const index = site.pages.indexOf(page);
      if (index >= 0) {
        site.pages.splice(index, 1);
        save();
        onRefresh();
      }
    });
  };

  const newPage = () => {
    let dialogResult;

    const close = () => dialogResult.close();

    const handleSubmit = (pagePath, name, method, onError) => {
      const { pages } = site;
      const path = pagePath.startsWith('/') ? pagePath.substring(1) : pagePath;

      const page = pages.find((p) => p.method === method && (p.name === name || p.path === path));
      if (page) {
        onError('Similar page found on site!');
        return;
      }

      pages.push({
        name,
        path,
        method,
        body: {},
        headers: {},
      });

      save();
      onRefresh();
      close();
    };

    dialogResult = dialog.show(
      <PageForm host={site.url} onClose={close} onSubmit={handleSubmit} />,
    );
  };

  return (
    <div>
      <div style={styles.sitePanelHeader}>
        <button type="button" style={styles.nameBtn} onClick={collapse} title={site.url}>
          <span>{site.name}</span>
        </button>
        <button type="button" title="New Page" onClick={newPage} style={styles.btn}>
          <img src={plusIcon} alt="new" style={styles.img} />
        </button>
        <button type="button" title="Delete" onClick={removeSite} style={styles.deleteBtn}>
          <img src={deleteIcon} alt="delete" style={styles.img} />
        </button>
      </div>
      {site.pages.length ? (
        <div style={styles.sitePanel}>
          {site.pages.map((page) => (
            <PagePanel
              key={page.name}
              host={site.url}
              page={page}
              onRefresh={onRefresh}
              onRemove={removePage}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

SitePanel.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  onRefresh: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

const SaveCurrentPageButton = ({ onRefresh }) => {
  const inputDialog = useTextInputDialog();
  const notification = useNotification();
  const url = useSelector(selectUrl);
  const method = useSelector(selectMethod);
  const body = useSelector(selectFormFields);
  const headers = useSelector(selectRequestHeaders);

  if (!url) {
    return null;
  }

  const handleClick = () => {
    inputDialog.show('Please Enter Name', (name) => {
      if (name) {
        let host;
        let path;
        try {
          const site = new URL(url);
          host = site.origin;
          path = site.pathname;
          if (path.startsWith('/')) {
            path = path.substring(1);
          }
        } catch {
          notification.showError(`It looks like ${url} is malformed!`);
        }

        notification.showInfo(host);
        notification.showInfo(path);

        let sites = getSites();
        let site = sites.find((s) => s.url === host);

        if (site) {
          const page = site.pages.find(
            (p) => p.method === method && (p.name === name || p.path === path),
          );
          if (page) {
            page.name = name;
            page.path = path || '/';
            page.method = method;
            page.body = { ...body };
            page.headers = { ...headers };
          } else {
            site.pages.push({
              name,
              path: path || '/',
              method,
              body: { ...body },
              headers: { ...headers },
            });
          }
          save();
          onRefresh();
          notification.showSuccess('Site successfully Updated');
        } else {
          site = sites.find((s) => s.name === name);
          if (site) {
            notification.showError(`A different site with name ${name} already exists!`);
            return;
          }

          createSite(host, name);
          sites = getSites();
          site = sites.find((s) => s.url === host);

          if (!site) {
            notification.showError('Application encountered an error while creating site!');
            return;
          }

          onRefresh();

          inputDialog.show('Enter Page Name', (pageName) => {
            if (pageName) {
              site.pages.push({
                name: pageName,
                path: path || '/',
                method,
                body: { ...body },
                headers: { ...headers },
              });

              onRefresh();
            }
          });
        }
      }
    });
  };

  return (
    <button type="button" style={styles.saveCurrentBtn} className="btn btn-blue" onClick={handleClick}>
      Save Current Page
    </button>
  );
};

SaveCurrentPageButton.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

const SavedSites = () => {
  const [sites, setSites] = useState(getSites());
  const [expandedSite, setExpandaded] = useState('');
  const dialog = useDialog();
  const notification = useNotification();

  const refresh = () => setSites([...getSites()]);

  const openForm = () => {
    let dialogResult;

    const closeForm = () => dialogResult.close();

    const handleSubmit = (url, name, setError) => {
      let origin;
      try {
        const host = new URL(url);
        origin = host.origin;
      } catch {
        notification.showError(`It looks like ${url} is malformed`);
        return;
      }

      if (!createSite(origin, name)) {
        setError('Could not create site. Url may already exist!');
        return;
      }

      refresh();
    };

    dialogResult = dialog.show(
      <KeyValueForm
        title="New Site"
        keyLabel="Site Url"
        valueLabel="Site Name"
        onClose={closeForm}
        onSubmit={handleSubmit}
      />,
    );
  };

  return (
    <section style={styles.container}>
      <h1 style={styles.h1}>Websites</h1>
      <div style={styles.body}>
        {sites.map((site) => (
          <SitePanel
            key={site.url}
            site={site}
            isExpanded={site.url === expandedSite}
            onRefresh={refresh}
            onExpand={setExpandaded}
          />
        ))}
      </div>
      <div style={styles.controls}>
        <button type="button" className="roundBtn" onClick={openForm}>
          <svg style={styles.svg} viewBox="0 0 24 24">
            <path fill="#fff" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </button>
      </div>
      <SaveCurrentPageButton onRefresh={refresh} />
    </section>
  );
};

export default SavedSites;
