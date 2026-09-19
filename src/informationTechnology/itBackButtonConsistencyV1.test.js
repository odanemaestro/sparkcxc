const fs=require('fs');
const path=require('path');

const read=rel=>fs.readFileSync(path.join(__dirname,rel),'utf8');

describe('Information Technology back button consistency',()=>{
  const study=read('components/informationTechnology.css');
  const labs=read('labs/informationTechnologyLabs.css');

  test('Study and Practical Labs back buttons share the same light-mode geometry',()=>{
    const declarations=[
      'min-height:46px',
      'padding:10px 16px',
      'border-radius:13px',
      'background:rgba(23,55,94,.09)',
      'border:1px solid rgba(23,55,94,.24)',
      'color:#17375e',
      'font-weight:850',
      'gap:8px',
    ];
    declarations.forEach(value=>{
      expect(study).toContain(value);
      expect(labs).toContain(value);
    });
  });

  test('Study and Practical Labs back buttons share the same dark-mode palette',()=>{
    const declarations=[
      'background:rgba(126,158,198,.14)',
      'border-color:rgba(156,184,219,.30)',
      'color:#dce8f6',
      'background:rgba(126,158,198,.22)',
      'border-color:rgba(156,184,219,.42)',
      'color:#eef4fb',
    ];
    declarations.forEach(value=>{
      expect(study).toContain(value);
      expect(labs).toContain(value);
    });
  });

  test('both back button families use non-emoji SVG arrows',()=>{
    const studyJs=read('components/InformationTechnologySubjectView.jsx');
    const labsHome=read('labs/InformationTechnologyPracticalLabs.jsx');
    const labFrame=read('labs/components/LabFrame.jsx');
    expect(studyJs).toContain('<BackIcon/>');
    expect(labsHome).toContain('<ArrowLeftIcon/>');
    expect(labFrame).toContain('<ArrowLeftIcon/>');
  });
});
