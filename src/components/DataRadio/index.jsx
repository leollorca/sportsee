const DataRadio = ({ setDataSource }) => {
  return (
    <div className="absolute bottom-8 right-8">
      <fieldset>
        <legend className="mb-4">Data</legend>
        <div className="mb-1">
          <input
            className="mr-2"
            type="radio"
            id="api"
            name="dataSource"
            value="api"
            defaultChecked={true}
            onChange={(e) => setDataSource(e.target.value)}
          />
          <label htmlFor="api">API (Karl)</label>
        </div>
        <div>
          <input
            className="mr-2"
            type="radio"
            id="mock"
            name="dataSource"
            value="mock"
            onChange={(e) => setDataSource(e.target.value)}
          />
          <label htmlFor="mock">Mock (Cecilia)</label>
        </div>
      </fieldset>
    </div>
  );
};

export default DataRadio;
