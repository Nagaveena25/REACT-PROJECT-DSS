import React, { useEffect, useRef, useState } from 'react';
// import { X, Search, Paperclip, MoreHorizontal, Copy, Calendar, AwardIcon } from 'lucide-react';
import { X, Search, Paperclip, MoreHorizontal, Copy, Calendar, Award } from 'lucide-react';
import { Incident } from '../types';
import toast from 'react-hot-toast';
import axios from 'axios';

interface NewIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (incident: Partial<Incident>) => void;
  editId: string | null;
}

const NewIncidentModal: React.FC<NewIncidentModalProps> = ({ isOpen, onClose, onSubmit, editId = "" }) => {
  const [formData, setFormData] = useState({
    caller: '',
    alternativeContact: '',
    location: '',
    category: '',
    subcategory: '',
    configurationItem: '',
    impact: '',
    urgency: '',
    priority: '',
    shortDescription: '',
    state: '',
    description: '',
    channel: '',
    assignmentGroup: '',
    assignedTo: '',
    workNotes: '',
    additionalComments: '',
    number:'',
    parent:'',
    opened:'',
    openedby:'',
    reassignmentCount: '',
    reOpenCount:'',
    assignedToCount:'',
    kbaUsed:'',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [errors, setErrors] = useState<{ [key: string]: boolean }>({});


  const [activeTab, setActiveTab] = useState('notes');
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
    // Trigger file input on button click
  const handleButtonClick = () => {
    // if(fileInputRef.current)
      fileInputRef.current?.click();
  };


  useEffect(()=>{
    // console.log("editid", editId)
    if(editId !== null || editId !== "")
      getFieldsData() 
  },[editId])
  // Handle selected file
  const handleFileChange = (event : any) => {
    const file = event.target.files[0];
    if (file) {
      // console.log("Selected file:", file);
      // You can now upload the file or preview it
    }
  };

  const steps = [
    'Detection and Recording',
    'Investigation and Diagnosis', 
    'Resolution and Recovery',
    'Confirmation and Closure'
  ];

  
  if (!isOpen && (editId !== "" || editId !== null)) return null;
  
  // const id = localStorage.getItem("ID")
  // if(id){
  //   getFieldsData();
  // }

  async function getFieldsData() {
    const fieldsData = await axios.post("http://localhost:5000/api/form/getFieldsbyId", {id : editId});
    // console.log("FieldsData", fieldsData);
    // console.log("FieldsData", fieldsData.data.data[0]);
    setFormData({
      caller: fieldsData?.data?.data[0]?.caller || "",
      alternativeContact: fieldsData?.data?.data[0]?.alternativeContact || "",
      location: fieldsData?.data?.data[0]?.location || "",
      category: fieldsData?.data?.data[0]?.category || "",
      subcategory: fieldsData?.data?.data[0]?.subcategory || "",
      configurationItem: fieldsData?.data?.data[0]?.configurationItem || "",
      impact: fieldsData?.data?.data[0]?.impact || "",
      urgency: fieldsData?.data?.data[0]?.urgency || "",
      priority: fieldsData?.data?.data[0]?.priority || "", 
      shortDescription: fieldsData?.data?.data[0]?.shortDescription || "",
      state: fieldsData?.data?.data[0]?.state || "",
      description: fieldsData?.data?.data[0]?.description || "",
      channel: fieldsData?.data?.data[0]?.channel || "",
      assignmentGroup: fieldsData?.data?.data[0]?.assignmentGroup || "",
      assignedTo: fieldsData?.data?.data[0]?.assignedTo || "",
      workNotes: fieldsData?.data?.data[0]?.workNotes || "",
      additionalComments: fieldsData?.data?.data[0]?.additionalComments || "",
      number: fieldsData?.data?.data[0]?.number || "",
      parent: fieldsData?.data?.data[0]?.parent || "",
      opened: fieldsData?.data?.data[0]?.opened || "",
      openedby: fieldsData?.data?.data[0]?.openedby || "",
      reassignmentCount: fieldsData?.data?.data[0]?.reassignmentCount || "", 
      reOpenCount: fieldsData?.data?.data[0]?.reOpenCount || "",
      assignedToCount: fieldsData?.data?.data[0]?.assignedToCount || "",
      kbaUsed: fieldsData?.data?.data[0]?.kbaUsed || "",
    })
  }
  // console.log("ID useEffect NewIncident", id);
  // console.log("Edit Id newIncident ", editId);

  // useEffect(()=>{
  // },[isOpen]);



  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit({
  //     ...formData,
  //     number: INC${Math.floor(Math.random() * 10000).toString().padStart(4, '0')},
  //     status: 'New',
  //     opened: new Date().toISOString(),
  //     priority: formData.priority as Incident['priority'],
  //     impact: formData.impact as Incident['impact'],
  //   });
  //   onClose();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Fields that are mandatory
  // const requiredFields = [
  //   'caller',
  //   'channel',
  //   'category',
  //   'subcategory',
  //   'assignmentGroup',
  //   'configurationItem',
  //   'impact',
  //   'shortDescription',
  //   'state',
  // ];
  const requiredFields: { [key: string]: string } = {
    caller: "Caller is required",
    channel: "Channel is required",
    category: "Category is required",
    subcategory: "Subcategory is required",
    assignmentGroup: "Assignment group is required",
    configurationItem: "Configuration item is required",
    impact: "Impact is required",
    shortDescription: "Short description is required",
    state: "State is required",
  };

  // Check which fields are empty
  // const newErrors: { [key: string]: boolean } = {};
  const newErrors: { [key: string]: string } = {};
  // requiredFields.forEach((field) => {
  //   if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData].trim() === '') {
  //     newErrors[field] = true;
  //   }
  // });
  Object.keys(requiredFields).forEach((field) => {
    if (!formData[field as keyof typeof formData]?.trim()) {
      newErrors[field] = requiredFields[field];
    }
  });
  // console.log("Errors : ", newErrors);

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    toast.error('Please fill all mandatory fields before submitting!');
    return; // stop submission until fixed
  }

  // console.log("Formdata", formData);
  // Stop if errors exist
  // if (Object.keys(newErrors).length > 0) {
  //   return;
  // }
  // if (Object.keys(newErrors).length > 0) {
  //   toast.error('Please fill all mandatory fields before submitting!');
  //   return;
  // }


  // console.log("Form Daata", formData);

  // console.log("Editd", editId,"dsfjks")
  // console.log("Editd", typeof editId)

  if(editId === null || editId === ''){
    const res = await axios.post("http://localhost:5000/api/form/add", formData);
    if(res.status ===  201){
      resetFormdata();
      toast.success("Data Submitted Successfully");
    }else{
      toast.error("Error Submitting the Form");
    }
  }else{
    const update = await axios.post("http://localhost:5000/api/form/update", {formData : formData, Id: editId});
    // console.log("Update", update);
    toast.success("Data Updated Successfully");
  }
  


  // Submit if all good
  // onSubmit({
  //   ...formData,
  //   number: INC${Math.floor(Math.random() * 10000).toString().padStart(4, '0')},
  //   status: 'New',
  //   opened: new Date().toISOString(),
  //   priority: formData.priority as Incident['priority'],
  //   impact: formData.impact as Incident['impact'],
  // });
  onClose();
};

  const resetFormdata = () =>{
    setFormData({
    caller: '',
    alternativeContact: '',
    location: '',
    category: '',
    subcategory: '',
    configurationItem: '',
    impact: '',
    urgency: '',
    priority: '',
    shortDescription: '',
    state: '',
    description: '',
    channel: '',
    assignmentGroup: '',
    assignedTo: '',
    workNotes: '',
    additionalComments: '',
    number:'',
    parent:'',
    opened:'',
    openedby:'',
    reassignmentCount: '',
    reOpenCount:'',
    assignedToCount:'',
    kbaUsed:'',
    })
  }



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-8 z-50">
      <div className="bg-white w-full max-w-6xl mx-4 rounded-lg shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center gap-4">
            <button onClick={()=>{
              resetFormdata()
              if(onClose)
                onClose()
            }} className="p-2 hover:bg-blue-100 rounded">
              <X size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Incident</span>
              <span className="text-gray-600">New record</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleButtonClick} className="p-2 hover:bg-blue-100 rounded">
              <Paperclip size={20} />
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </button>
            <button className="p-2 hover:bg-blue-100 rounded">
              <MoreHorizontal size={20} />
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex bg-gray-100 border-b border-gray-200">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 px-4 py-3 text-center text-sm font-medium relative ${
                index === currentStep
                  ? 'bg-green-600 text-white'
                  : index < currentStep
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {step}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-0 w-0 h-0 border-t-[24px] border-b-[24px] border-l-[12px] border-t-transparent border-b-transparent border-l-current"></div>
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-6 p-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                <input
                  type="text"
                  // value="Auto-generated"
                  value={formData.number}
                    onChange={(e) => {
                      setFormData({ ...formData, number: e.target.value });
                      // setErrors({ ...errors, caller: false }); // clear error on change
                    }}
                    
                    // disabled={!!editId}  
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caller <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.caller}
                    onChange={(e) => {
                      setFormData({ ...formData, caller: e.target.value });
                      // setErrors({ ...errors, caller: false }); // clear error on change
                    }}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 pr-10 ${
                      errors.caller ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Search for caller"

                    // onChange={(e) => setFormData({...formData, caller: e.target.value})}
                    // className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    // placeholder="Search for caller"
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                  {errors.caller && (
                    <p className="text-red-500 text-sm mt-1">{errors.caller}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Contact</label>
                <input
                  type="text"
                  value={formData.alternativeContact}
                  onChange={(e) => setFormData({...formData, alternativeContact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                  // disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                    // setErrors({ ...errors, category: false });
                  }}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 ${
                    errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}

                  // onChange={(e) => setFormData({...formData, category: e.target.value})}
                  // className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- None --</option>
                  <option value="BIC Process Design application">BIC Process Design application</option>
  <option value="CoV Server and Cloud Services">CoV Server and Cloud Services</option>
  <option value="Data Exchange">Data Exchange</option>
  <option value="Data Governance">Data Governance</option>
  <option value="HSE application">HSE application</option>
  <option value="Power BI">Power BI</option>
  <option value="Project Management Applications">Project Management Applications</option>
  <option value="RPA">RPA</option>
  <option value="Sales / Marketing / Communications">Sales / Marketing / Communications</option>
  <option value="Travel and Expense">Travel and Expense</option>
  <option value="Finance applications">Finance applications</option>
  <option value="Computer Application">Computer Application</option>
  <option value="NTT Security">NTT Security</option>
  <option value="Computer Hardware and accessories">Computer Hardware and accessories</option>
  <option value="Conferencing and Telephony">Conferencing and Telephony</option>
  <option value="Access Management">Access Management</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => {
                    setFormData({ ...formData, subcategory: e.target.value });
                    // setErrors({ ...errors, category: false });
                  }}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 ${
                    errors.subcategory ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}

                  // onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                  // className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- None --</option>
                   <option value="Cadenas">Cadenas</option>
                   <option value="GRANTA">GRANTA</option>
                   <option value="IT Hub">IT Hub</option>
                   <option value="OEIAM">OEIAM</option>
                   <option value="Onshape">Onshape</option>
                   <option value="Searchportal">Searchportal</option>
                    <option value="Simulation - TMap, WAT ACT, CDO">Simulation - TMap, WAT ACT, CDO</option>
                    <option value="Statement of Requirements (SOR)">Statement of Requirements (SOR)</option>
                   <option value="BOM Manager">BOM Manager</option>
                   <option value="3D Drive - WRS">3D Drive - WRS</option>
                   <option value="Turbo Labs GS Control Plan">Turbo Labs GS Control Plan</option>
                   <option value="BCES">BCES</option>
                   <option value="e-Launch">e-Launch</option>
                   <option value="LabPCS">LabPCS</option>
                   <option value="GBH">GBH</option>
                </select>
                {errors.subcategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Configuration Item <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.configurationItem}
                    onChange={(e) => {
                      setFormData({ ...formData, configurationItem: e.target.value });
                      // setErrors({ ...errors, caller: false }); // clear error on change
                    }}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 pr-10 ${
                      errors.configurationItem ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    // placeholder="Search for caller"
                    // value={formData.configurationItem}
                    // onChange={(e) => setFormData({...formData, configurationItem: e.target.value})}
                    // className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                  {errors.configurationItem && (
                    <p className="text-red-500 text-sm mt-1">{errors.configurationItem}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impact <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  // value="4 - Low"
                  value={formData.impact}
                    onChange={(e) => {
                      setFormData({ ...formData, impact: e.target.value });
                      // setErrors({ ...errors, impact: false }); // clear error on change
                    }}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 pr-10 ${
                      errors.impact ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  // disabled
                  // className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500"
                />
                {errors.impact && (
                  <p className="text-red-500 text-sm mt-1">{errors.impact}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                <input
                  type="text"
                  value={formData.urgency}
                  onChange={(e) => {
                    setFormData({ ...formData, urgency: e.target.value });
                    // setErrors({ ...errors, impact: false }); // clear error on change
                  }}

                  // value="4 -sdfsdf"
                  // disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded  text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="bg-blue-50 border border-blue-200 rounded p-2 text-blue-800 text-sm">
                  4 - Low
                  <div className="text-xs mt-1">Please contact Servicedesk to change the priority.</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.parent}
                    onChange={(e) => {
                      setFormData({ ...formData, parent: e.target.value });
                      // setErrors({ ...errors, impact: false }); // clear error on change
                    }}

                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opened</label>
                <input
                  //type="text"
                   type="datetype-local"
                  //value={formData.opened}
                  onChange={(e) => {
                    setFormData({ ...formData, opened: e.target.value });
                    // setErrors({ ...errors, impact: false }); // clear error on change
                  }}
                  // value="2025-09-11 06:48:41"
                  // disabled
                  placeholder='2025-09-25'
                  //type="datetype-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opened by</label>
                <input
                  type="text"
                  // value="Jyosthna Sagili"
                  // disabled
                  value={formData.openedby}
                  onChange={(e) => {
                    setFormData({ ...formData, openedby: e.target.value });
                    // setErrors({ ...errors, impact: false }); // clear error on change
                  }}

                  className="w-full px-3 py-2 border border-gray-300 rounded  text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Channel <span className="text-red-500">*</span>
                </label>
                <select 
                  onChange={(e) => {
                    setFormData({ ...formData, channel: e.target.value });
                    // setErrors({ ...errors, channel: false });
                  }}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 ${
                    errors.channel ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  value={formData.channel}
                  // onChange={(e) => setFormData({...formData, channel: e.target.value})}
                  // className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- None --</option>
                   <option value="Agent Chat">Agent Chat</option>
                   <option value="Alert">Alert</option>
                   <option value="Email">Email</option>
                   <option value="Chat">Chat</option>
                   <option value="Phone">Phone</option>
                   <option value="Credential/Identity Protection">Credential/Identity Protection</option>
                   <option value="Email/Social Engineering Detection">Email/Social Engineering Detection</option>
                   <option value="Endpoint detection">Endpoint detection</option>
                   <option value="Network detection">Network detection</option>
                   <option value="Self-service">Self-service</option>
                   <option value="E-Bond">E-Bond</option>
                   <option value="Walk-in">Walk-in</option>
                   <option value="Integration">Integration</option>
                   <option value="Monitoring tool">Monitoring tool</option>
                </select>
                {errors.channel && (
                  <p className="text-red-500 text-sm mt-1">{errors.channel}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  onChange={(e) => {

                    const newState = e.target.value;
                    setFormData({ ...formData, state: newState });
                    if (newState === 'Resolved') {
                      toast.error('You are going to close the ticket'); // Show warning toast
                    }
                    // setFormData({ ...formData, state: e.target.value });
                    // setErrors({ ...errors, state: false });

                  }}
                  value={formData.state}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 ${
                    errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  // className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  // defaultValue="New"
                >
                  <option value="">-- None --</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Resolved">Resolved</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment group <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.assignmentGroup}
                    onChange={(e) => {
                      setFormData({ ...formData, assignmentGroup: e.target.value });
                      // setErrors({ ...errors, assignmentGroup: false }); // clear error on change
                    }}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 pr-10 ${
                      errors.assignmentGroup ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    // placeholder=""
                    // value={formData.assignmentGroup}
                    // onChange={(e) => setFormData({...formData, assignmentGroup: e.target.value})}
                    // className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                  {errors.assignmentGroup && (
                    <p className="text-red-500 text-sm mt-1">{errors.assignmentGroup}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned to</label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                  // disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reassignment count</label>
                <input
                  type="text"
                  // value="-1"
                  // disabled
                  value={formData.reassignmentCount}
                  onChange={(e) => setFormData({...formData, reassignmentCount: e.target.value})}
                  // className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reopen count</label>
                <input
                  type="text"
                  // value="0"
                  // disabled
                  value={formData.reOpenCount}
                  onChange={(e) => setFormData({...formData, reOpenCount: e.target.value})}

                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned to count</label>
                <input
                  type="text"
                  // assignedToCount
                  value={formData.assignedToCount}
                  onChange={(e) => setFormData({...formData, assignedToCount: e.target.value})}


                  // value="0"
                  // disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Wrong Assignment</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Impact multiple</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">Prevent you from working</span>
                </label>
              </div>
            </div>
          </div>

          {/* Short Description and Description */}
          <div className="px-6 pb-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => {
                    setFormData({ ...formData, shortDescription: e.target.value });
                    // setErrors({ ...errors, shortDescription: false });
                  }}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 h-20 ${
                    errors.shortDescription ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter short description"
                  // value={formData.shortDescription}
                  // onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  // className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
                  // placeholder="Enter short description"
                />
                
                <div className="absolute bottom-2 left-2 flex gap-2 mt-2 mb-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Calendar size={16} />
                  </button>
                </div>
                {errors.shortDescription && (
                  <p className="text-red-500 text-sm mt-3">{errors.shortDescription}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                placeholder="Enter detailed description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">KBA Used</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.kbaUsed}
                  onChange={(e) => setFormData({...formData, kbaUsed: e.target.value})}

                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6">
            <div className="border-b border-gray-200 mb-4">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'notes'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Notes
                </button>
                <button
                  onClick={() => setActiveTab('related')}
                  className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'related'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Related Records
                </button>
              </div>
            </div>

            {activeTab === 'notes' && (
              <div className="space-y-4 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-sm font-medium text-gray-700">Watchlist</label>
                      <div className="flex gap-1">
                        <button className="p-1 border border-gray-300 rounded text-xs">📋</button>
                        <button className="p-1 border border-gray-300 rounded text-xs">👤</button>
                      </div>
                    </div>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded h-24" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-sm font-medium text-gray-700">Work notes list</label>
                      <div className="flex gap-1">
                        <button className="p-1 border border-gray-300 rounded text-xs">📋</button>
                        <button className="p-1 border border-gray-300 rounded text-xs">👤</button>
                      </div>
                    </div>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded h-24" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work notes</label>
                  <textarea
                    value={formData.workNotes}
                    onChange={(e) => setFormData({...formData, workNotes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded h-24"
                    placeholder="Enter work notes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional comments (Customer visible)
                  </label>
                  <textarea
                    value={formData.additionalComments}
                    onChange={(e) => setFormData({...formData, additionalComments: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded h-24"
                    placeholder="Enter additional comments"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIncidentModal;