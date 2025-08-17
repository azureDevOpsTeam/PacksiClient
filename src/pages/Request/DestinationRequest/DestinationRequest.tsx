

// export default DestinationRequest

import DestinationRequestForm from "../RequestForm/DestinationRequestForm"
import PageMeta from "../../../components/tools/common/PageMeta";
import FormLayout from "../../../components/layout/main/FormLayout";



export default function OriginRequest() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <FormLayout>
        <DestinationRequestForm />
      </FormLayout>
    </>
  );
}

