import { useSelector } from 'react-redux';
import TabControl from '../containers/TabControl';
import JsonViewer from '../lib/JsonViewer';
import { selectRequestError, selectResponseBody, selectResponseHeader } from '../reducers/requestSlice';

export default function ResponseViewer() {
  const header = useSelector(selectResponseHeader);
  const body = useSelector(selectResponseBody);
  const error = useSelector(selectRequestError);

  return (
    <TabControl
      activeHeader="Body"
      headers={['Head', 'Body', 'Error']}
      items={[
        <JsonViewer key="Head" json={header} />,
        <JsonViewer key="Body" json={body} />,
        <JsonViewer key="Error" json={error} />,
      ]}
      panelStyle={{ overflow: 'auto', borderTop: '1px solid #62b5e5' }}
    />
  );
}
