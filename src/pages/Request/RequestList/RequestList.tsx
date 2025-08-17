import PageMeta from "../../../components/tools/common/PageMeta";
import FormLayout from "../../../components/layout/main/FormLayout";
import RequestListForm from "../RequestForm/RequestListForm";


export default function RequestList() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <FormLayout>
        <RequestListForm />
      </FormLayout>
    </>
  );
}
