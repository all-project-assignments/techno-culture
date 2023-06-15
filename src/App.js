import data from './data/data.json';

const defaultValues = {

}


function App() {
    const base = data.columns.slice(0,4);
    console.log(base)
  console.log(data.columns);

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 shadow-lg">
            {base.map((col) => {
                return (
                    <div className="flex justify-between px-4 py-2 items-center">
                      <label className="text-slate-300 text-sm" htmlFor={col.label}>
                        {col.label}:
                      </label>
                      <input defaultValue={col.default}  />
                    </div>
                  );
            })}
            <hr /><hr />
          {data.columns.slice(4).map((col) => {
            return (
              <div className="flex justify-between px-4 py-2 items-center">
                <label className="text-slate-300 text-sm" htmlFor={col.label}>
                  {col.label}:
                </label>
                <input defaultValue={col.default}  />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
