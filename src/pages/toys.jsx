import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
import PageSubtitle from "../components/PageSubtitle";
import PageDescription from "../components/PageDescription";
import CodePen from "../components/CodePen";

function Toys() {
  return (
    <PageSection>
      <PageTitle>Toys</PageTitle>
      <PageSubtitle></PageSubtitle>
      
      <div className="flex flex-wrap">

        

        <div
          className="min-w-[400px] flex-grow m-2 p-1 rounded shadow-xl bg-slate-200/50"
        >
          <CodePen
            title="JavaScript Calculator (FreeCodeCamp)"
            embedUrl="https://codepen.io/bluesaltlabs/embed/ZWwKVa"
            height="525"
            width="100%"
          />
        </div>

        <div
          className="min-w-[400px] flex-grow m-2 p-1 rounded shadow-xl bg-slate-200/50"
        >
          <CodePen
            title="Breathing Timer"
            embedUrl="https://codepen.io/bluesaltlabs/embed/ezXjLm"
            height="525"
            width="100%"
          /> 
        </div>        
        
        <div
          className="min-w-[400px] flex-grow m-2 p-1 rounded shadow-xl bg-slate-200/50"
        >
          <CodePen
            title="Breathing Timer"
            embedUrl="https://codepen.io/bluesaltlabs/embed/Ravzwb"
            height="525"
            width="100%"
          /> 
        </div>

        <div
          className="min-w-[400px] flex-grow m-2 p-1 rounded shadow-xl bg-slate-200/50"
        >
          <CodePen
            title="Basic CSS Color Tool"
            embedUrl="https://codepen.io/bluesaltlabs/embed/BzeXxq"
            height="525"
            width="100%"
          /> 
        </div>
        
        
      </div>


    </PageSection>
  )
}

export default Toys;
