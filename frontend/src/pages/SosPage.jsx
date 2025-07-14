"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Shield,
  Heart,
  AlertTriangle,
  Users,
  Clock,
  MapPin,
  PhoneCall,
  Globe,
} from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import SidebarLayout from "@/components/SidebarLayout"

// National helplines data (can be expanded based on location)
const helplines = {
  india: [
    {
      name: "iCall",
      number: "9152987821",
      description: "Psychosocial helpline by TISS",
      hours: "Mon-Sat, 8 AM - 10 PM",
      type: "call",
      website: "http://icallhelpline.org/",
    },
    {
      name: "Vandrevala Foundation",
      number: "9999666555",
      description: "24/7 mental health support",
      hours: "24/7",
      type: "call",
      website: "https://www.vandrevalafoundation.com/",
    },
    {
      name: "AASRA",
      number: "9820466726",
      description: "Suicide prevention helpline",
      hours: "24/7",
      type: "call",
      website: "http://www.aasra.info/",
    },
    {
      name: "Sneha Foundation",
      number: "04424640050",
      description: "Emotional support and suicide prevention",
      hours: "24/7",
      type: "call",
      website: "https://snehaindia.org/",
    },
    {
      name: "Mann Talks",
      number: "8686139139",
      description: "Mental health support",
      hours: "Mon-Sun, 10 AM - 6 PM",
      type: "call",
      website: "https://www.manntalks.org/",
    },
  ],
  international: [
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to 741741",
      hours: "24/7",
      type: "text",
      website: "https://www.crisistextline.org/",
    },
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "US suicide prevention hotline",
      hours: "24/7",
      type: "call",
      website: "https://suicidepreventionlifeline.org/",
    },
    {
      name: "Samaritans",
      number: "116123",
      description: "UK emotional support",
      hours: "24/7",
      type: "call",
      website: "https://www.samaritans.org/",
    },
  ],
}

export default function SOSPage() {
  const navigate = useNavigate()
  const [emergencyContacts, setEmergencyContacts] = useState([])
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
    notes: "",
  })
  const [userLocation, setUserLocation] = useState("india") // Default to India, can be detected

  useEffect(() => {
    // Load saved contacts from localStorage
    const savedContacts = localStorage.getItem("emergencyContacts")
    if (savedContacts) {
      setEmergencyContacts(JSON.parse(savedContacts))
    }
  }, [])

  const saveContacts = (contacts) => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts))
    setEmergencyContacts(contacts)
  }

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: Date.now(),
        ...newContact,
      }
      const updatedContacts = [...emergencyContacts, contact]
      saveContacts(updatedContacts)
      setNewContact({ name: "", phone: "", relationship: "", notes: "" })
      setIsAddingContact(false)
    }
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact.id)
    setNewContact(contact)
    setIsAddingContact(true)
  }

  const handleUpdateContact = () => {
    const updatedContacts = emergencyContacts.map((contact) =>
      contact.id === editingContact ? { ...newContact, id: editingContact } : contact,
    )
    saveContacts(updatedContacts)
    setNewContact({ name: "", phone: "", relationship: "", notes: "" })
    setIsAddingContact(false)
    setEditingContact(null)
  }

  const handleDeleteContact = (id) => {
    const updatedContacts = emergencyContacts.filter((contact) => contact.id !== id)
    saveContacts(updatedContacts)
  }

  const handleEmergencyCall = (contact) => {
    // In a real app, this would initiate a phone call
    window.location.href = `tel:${contact.phone}`
  }

  const handleEmergencyText = (contact) => {
    // In a real app, this would open SMS app
    const message = "Hi, I need support right now. Can you please call me or come over? This is from my MindfulMe app."
    window.location.href = `sms:${contact.phone}?body=${encodeURIComponent(message)}`
  }

  const handleHelplineCall = (helpline) => {
    window.location.href = `tel:${helpline.number}`
  }

  const currentHelplines = [...helplines[userLocation], ...helplines.international]

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md border-b border-red-200 px-6 py-4 mb-8">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate("/welcome")} className="rounded-full hover:bg-red-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  SOS - Emergency Support
                </h1>
              </div>
              <div className="w-24"></div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6">
            {/* Emergency Alert */}
            <Card className="mb-8 bg-gradient-to-r from-red-100 to-pink-100 border-red-300 rounded-3xl">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-800 mb-2">You Are Not Alone</h2>
                <p className="text-red-700 mb-4">
                  If you're in crisis or need immediate support, please reach out. Help is available 24/7.
                </p>
                <Badge className="bg-red-200 text-red-800 px-4 py-2 rounded-full">
                  Emergency support is just one tap away
                </Badge>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Emergency Contacts Section */}
              <div className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-orange-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                      <Users className="w-6 h-6 mr-3 text-orange-500" />
                      Emergency Contacts
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Your trusted people who can provide immediate support
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {emergencyContacts.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No emergency contacts added yet</p>
                        <Button
                          onClick={() => setIsAddingContact(true)}
                          className="rounded-2xl bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Contact
                        </Button>
                      </div>
                    ) : (
                      <>
                        {emergencyContacts.map((contact) => (
                          <Card
                            key={contact.id}
                            className="bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-bold text-gray-800">{contact.name}</h4>
                                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                                  <p className="text-sm text-gray-500">{contact.phone}</p>
                                </div>
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleEditContact(contact)}
                                    variant="ghost"
                                    className="rounded-full"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleDeleteContact(contact.id)}
                                    variant="ghost"
                                    className="rounded-full text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              {contact.notes && <p className="text-xs text-gray-500 mb-3 italic">"{contact.notes}"</p>}
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => handleEmergencyCall(contact)}
                                  className="flex-1 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3"
                                >
                                  <Phone className="w-4 h-4 mr-2" />
                                  CALL NOW
                                </Button>
                                <Button
                                  onClick={() => handleEmergencyText(contact)}
                                  variant="outline"
                                  className="flex-1 rounded-2xl border-2 border-orange-300 hover:bg-orange-50"
                                >
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  TEXT
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button
                          onClick={() => setIsAddingContact(true)}
                          variant="outline"
                          className="w-full rounded-2xl border-2 border-orange-300 hover:bg-orange-50"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Another Contact
                        </Button>
                      </>
                    )}

                    {/* Add/Edit Contact Form */}
                    {isAddingContact && (
                      <Card className="bg-white border-2 border-orange-300 rounded-2xl">
                        <CardContent className="p-4 space-y-4">
                          <h4 className="font-bold text-gray-800">
                            {editingContact ? "Edit Contact" : "Add Emergency Contact"}
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Name *</Label>
                              <Input
                                id="name"
                                value={newContact.name}
                                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                placeholder="Contact name"
                                className="rounded-xl"
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone *</Label>
                              <Input
                                id="phone"
                                value={newContact.phone}
                                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                                placeholder="+1234567890"
                                className="rounded-xl"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="relationship">Relationship</Label>
                            <Input
                              id="relationship"
                              value={newContact.relationship}
                              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                              placeholder="Friend, Family, Therapist, etc."
                              className="rounded-xl"
                            />
                          </div>
                          <div>
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                              id="notes"
                              value={newContact.notes}
                              onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                              placeholder="Any special instructions or notes..."
                              className="rounded-xl"
                              rows={2}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={editingContact ? handleUpdateContact : handleAddContact}
                              className="flex-1 rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
                            >
                              {editingContact ? "Update Contact" : "Add Contact"}
                            </Button>
                            <Button
                              onClick={() => {
                                setIsAddingContact(false)
                                setEditingContact(null)
                                setNewContact({ name: "", phone: "", relationship: "", notes: "" })
                              }}
                              variant="outline"
                              className="flex-1 rounded-xl"
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* National Helplines Section */}
              <div className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-blue-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                      <PhoneCall className="w-6 h-6 mr-3 text-blue-500" />
                      National Helplines
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Professional mental health support available 24/7
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentHelplines.map((helpline, index) => (
                      <Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 mb-1">{helpline.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{helpline.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {helpline.hours}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {userLocation === "india" ? "India" : "International"}
                                </div>
                              </div>
                            </div>
                            <Badge
                              className={`${
                                helpline.type === "call" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                              } rounded-full`}
                            >
                              {helpline.type === "call" ? "Call" : "Text"}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleHelplineCall(helpline)}
                              className="flex-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold"
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              {helpline.number}
                            </Button>
                            {helpline.website && (
                              <Button
                                onClick={() => window.open(helpline.website, "_blank")}
                                variant="outline"
                                size="sm"
                                className="rounded-2xl border-blue-300 hover:bg-blue-50"
                              >
                                <Globe className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Tips */}
                <Card className="bg-gradient-to-r from-green-100 to-teal-100 border-green-300 rounded-3xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-green-800 mb-4">💚 Remember</h3>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li>• You are not alone in this</li>
                      <li>• It's okay to ask for help</li>
                      <li>• Crisis feelings are temporary</li>
                      <li>• Professional help is available</li>
                      <li>• Your life has value and meaning</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
