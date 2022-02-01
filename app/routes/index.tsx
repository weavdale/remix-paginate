import { LoaderFunction, useLoaderData, json, Link } from 'remix';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? 1);
  const pageSize = Number(url.searchParams.get('pageSize') ?? 5);
  const items = Array(pageSize)
    .fill('')
    .map((_, index) => {
      const id = (page - 1) * pageSize + index + 1;
      return { id, title: `Item ${id}` };
    });
  return json({ items, page });
};

export default function (): JSX.Element {
  const { items, page } = useLoaderData();
  console.log(items);
  return (
    <div>
      <h2>Pagination</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="navLinks">
        {page > 1 ? <Link to={`?page=${page - 1}`}>Previous</Link> : null}
        <Link to={`?page=${page + 1}`}>Next</Link>
      </div>
    </div>
  );
}
