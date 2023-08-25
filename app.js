const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uuid = require('uuid');
const path=require('path');
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


const options={
  definition:{

  "openapi": "3.0.0",
  "info": {
    "title": "Loan Application API",
    "version": "1.0.0"
  },
  "paths": {
    "/apply": {
      "get": {
        "summary": "Get the loan application form",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/html": {
                "example": "<h2>Loan Application Form</h2><form action=\"/apply\" method=\"post\"><input type=\"text\" name=\"name\" placeholder=\"Name\" required><input type=\"email\" name=\"email\" placeholder=\"Email\" required><input type=\"number\" name=\"amount\" placeholder=\"Amount\" required><input type=\"text\" name=\"typeOfLoan\" placeholder=\"Loan Type\" required><button type=\"submit\">Apply</button></form>"
              }
            }
          }
        }
      },
      "post": {
        "summary": "Submit a loan application",
        "responses": {
          "200": {
            "description": "Application submitted successfully",
            "content": {
              "text/html": {
                "example": "<h1>Applied successfully</h1>"
              }
            }
          }
        }
      }
    },
    "/loan-status/{id}": {
      "get": {
        "summary": "Get loan status by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "status": "approved"
                }
              }
            }
          },
          "404": {
            "description": "Loan not found",
            "content": {
              "application/json": {
                "example": {
                  "message": "Loan not found"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "application/json": {
                "example": {
                  "message": "Internal server error"
                }
              }
            }
          }
        }
      }
    },
    "/available-loans": {
      "get": {
        "summary": "Get available loan types",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "availableLoans": ["Personal Loan", "Home Loan", "Auto Loan", "Education Loan"]
                }
              }
            }
          }
        }
      }
    },
    "/approved-loans": {
      "get": {
        "summary": "Get approved loans",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "approvedLoans": []
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "application/json": {
                "example": {
                  "message": "Internal server error"
                }
              }
            }
          }
        }
      }
    },
    "/view-loan/{id}": {
      "get": {
        "summary": "View a loan application by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "loan": {}
                }
              }
            }
          },
          "404": {
            "description": "Loan not found",
            "content": {
              "application/json": {
                "example": {
                  "message": "Loan not found"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "application/json": {
                "example": {
                  "message": "Internal server error"
                }
              }
            }
          }
        }
      }
    },
    "/approve-loan/{id}": {
      "put": {
        "summary": "Approve a loan",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Loan approved",
            "content": {
              "application/json": {
                "example": {
                  "message": "Loan approved"
                }
              }
            }
          },
          "404": {
            "description": "Loan not found",
            "content": {
              "application/json": {
                "example": {
                  "message": "Loan not found"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "application/json": {
                "example": {
                  "message": "Internal server error"
                }
              }
            }
          }
        }
      }
    },
    "/pending-approvals": {
      "get": {
        "summary": "Get pending approvals",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "example": {
                  "pendingApprovals": []
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "application/json": {
                "example": {
                  "message": "Internal server error"
                }
              }
            }
          }
        }
      }
    },
    "/reject-loan/{id}": {
      "put": {
        "summary": "Reject a loan",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Loan rejected",
            "content": {
              "application/json": {
                "example": {
                  "message": "Loan rejected"
                }
              }
            }
          },
          "404": {
            "description": "Loan not found",
            "content": {
              "application/json": {
                "example": {
                  "message": "Loan not found"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "application/json": {
                "example": {
                  "message": "Internal server error"
                }
              }
            }
          }
        }
      }
    }
  },
  servers: [
    {
      "url": "http://localhost:8080/"
    }
  ]
},

   apis:['./app.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api.docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

mongoose.connect('mongodb://0.0.0.0/loanApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tutSchema=new mongoose.Schema({
    loanId: {
        type: String,
        default: uuid.v4,
        unique: true
      },
    name:{
       type:String,
        required:true
     },
     email:{
       type:String,
       required:true
     },
     amount:{
       type:Number,
       required:true
     },
     typeOfLoan:{
       type:String,
       required:true
     },
     status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      required:true
    }

  });
   const loanApplications= new mongoose.model('loanapplications',tutSchema);


// Apply for a loan


 app.get('/apply',(req,res,next)=>{
        res.sendFile(path.join(__dirname,'view','apply.html'));
        
     })
    
     app.post('/apply',  (req, res) => {
        console.log("form data:",req.bod);
             
          loanApplications.insertMany(req.body);
          res.send("<h1> applied suceessfully</h1>")
      });



  
app.get('/loan-status/:id', async (req, res) => {  
    const loanId = req.params.id;
  
    try {
      const loanApplication = await loanApplications.findById(loanId);
  
      if (!loanApplication) {
        return res.status(404).json({ message: 'Loan not found' });
      }
  
      res.json({ status: loanApplication.status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Get available loan types
app.get('/available-loans', (req, res) => {
  const availableLoans = ['Personal Loan', 'Home Loan', 'Auto Loan', 'Education Loan'];
  res.json({ availableLoans });
});


// Get approved loans
app.get('/approved-loans', async (req, res) => {
  try {
    const approvedLoans = await loanApplications.find({ status: 'approved' });
    res.json({ approvedLoans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// View a loan application by ID
app.get('/view-loan/:id', async (req, res) => {
  const loanId = req.params.id;

  try {
    const loan = await loanApplications.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.json({ loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Approve a loan
app.put('/approve-loan/:id', async (req, res) => {
    const  loanId = req.params.id;
  
    try {
      const updatedLoan = await loanApplications.findByIdAndUpdate(
        loanId,
        { $set: { status: 'approved' } },
        { new: true }
      );
  
      if (!updatedLoan) {
        return res.status(404).json({ message: 'Loan not found' });
      }
  
      res.json({ message: 'Loan approved' ,loan:updatedLoan});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Get pendi/pending-approvalsng approvals
app.get('/pending-approvals', async (req, res) => {
  try {
    const pendingApprovals = await loanApplications.find({ status: 'pending' });
    res.json({ pendingApprovals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reject a loan
app.put('/reject-loan/:id', async (req, res) => {
  const loanId = req.params.id;

  try {
    
    const updatedLoan = await loanApplications.findByIdAndUpdate(
      loanId,
      {$set: { status: 'rejected' } }, //$set:
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.json({ message: 'Loan rejected', loan: updatedLoan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
