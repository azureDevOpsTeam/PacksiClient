// import React from 'react'

// function RequestDetail() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default RequestDetail

import PageMeta from "../../../components/tools/common/PageMeta";
import FormLayout from "../../../components/layout/main/FormLayout";
import NewRequestForm from "../RequestForm/NewRequestForm";

export default function RequestDetail() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <FormLayout>
        <NewRequestForm />
      </FormLayout>
    </>
  );
}
