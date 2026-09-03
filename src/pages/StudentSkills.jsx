
import { useEffect, useState } from "react";
import api from "../services/api";

function StudentSkills() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [proficiency, setProficiency] = useState("BEGINNER");

  const [editingId, setEditingId] = useState(null);
  const [editSkillName, setEditSkillName] = useState("");
  const [editProficiency, setEditProficiency] = useState("BEGINNER");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  // GET - Fetch student's skills
  const fetchSkills = async () => {
    try {
      const response = await api.get("/api/student/skills");
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError("Unable to load skills.");
    } finally {
      setLoading(false);
    }
  };

  // POST - Add new skill
  const handleAddSkill = async (e) => {
    e.preventDefault();

    if (!skillName.trim()) {
      setError("Please enter a skill name.");
      return;
    }

    try {
      setAdding(true);
      setError("");
      setSuccess("");

      const response = await api.post("/api/student/skills", {
        skillName: skillName.trim(),
        proficiency: proficiency,
      });

      setSkills((previousSkills) => [
        ...previousSkills,
        response.data,
      ]);

      setSkillName("");
      setProficiency("BEGINNER");

      setSuccess("Skill added successfully.");
    } catch (error) {
      console.error("Error adding skill:", error);

      if (error.response?.data) {
        setError(
          typeof error.response.data === "string"
            ? error.response.data
            : "Unable to add skill."
        );
      } else {
        setError("Unable to add skill.");
      }
    } finally {
      setAdding(false);
    }
  };

  // Start editing a skill
  const handleEditClick = (skill) => {
    setEditingId(skill.id);
    setEditSkillName(skill.skillName);
    setEditProficiency(skill.proficiency);

    setError("");
    setSuccess("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditSkillName("");
    setEditProficiency("BEGINNER");
  };

  // PUT - Update existing skill
  const handleUpdateSkill = async (e) => {
    e.preventDefault();

    if (!editSkillName.trim()) {
      setError("Please enter a skill name.");
      return;
    }

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        `/api/student/skills/${editingId}`,
        {
          skillName: editSkillName.trim(),
          proficiency: editProficiency,
        }
      );

      setSkills((previousSkills) =>
        previousSkills.map((skill) =>
          skill.id === editingId ? response.data : skill
        )
      );

      setEditingId(null);
      setEditSkillName("");
      setEditProficiency("BEGINNER");

      setSuccess("Skill updated successfully.");
    } catch (error) {
      console.error("Error updating skill:", error);

      if (error.response?.data) {
        setError(
          typeof error.response.data === "string"
            ? error.response.data
            : "Unable to update skill."
        );
      } else {
        setError("Unable to update skill.");
      }
    } finally {
      setUpdating(false);
    }
  };

  // DELETE - Delete existing skill
  const handleDeleteSkill = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      await api.delete(`/api/student/skills/${id}`);

      setSkills((previousSkills) =>
        previousSkills.filter((skill) => skill.id !== id)
      );

      setSuccess("Skill deleted successfully.");
    } catch (error) {
      console.error("Error deleting skill:", error);

      if (error.response?.data) {
        setError(
          typeof error.response.data === "string"
            ? error.response.data
            : "Unable to delete skill."
        );
      } else {
        setError("Unable to delete skill.");
      }
    } finally {
      setDeleting(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-lg">Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        {/* Page Heading */}
        <h1 className="text-3xl font-bold mb-2">
          My Skills
        </h1>

        <p className="text-slate-400 mb-8">
          Add and manage your skills and proficiency levels.
        </p>

        {/* Add Skill Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">

          <h2 className="text-xl font-semibold mb-5">
            Add Skill
          </h2>

          <form
            onSubmit={handleAddSkill}
            className="space-y-4"
          >

            {/* Skill Name */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Skill Name
              </label>

              <input
                type="text"
                value={skillName}
                onChange={(e) =>
                  setSkillName(e.target.value)
                }
                placeholder="e.g. Python"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Proficiency */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Proficiency
              </label>

              <select
                value={proficiency}
                onChange={(e) =>
                  setProficiency(e.target.value)
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="BEGINNER">
                  Beginner
                </option>

                <option value="INTERMEDIATE">
                  Intermediate
                </option>

                <option value="ADVANCED">
                  Advanced
                </option>
              </select>
            </div>

            {/* Add Button */}
            <button
              type="submit"
              disabled={adding}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold transition"
            >
              {adding ? "Adding..." : "Add Skill"}
            </button>

          </form>
        </div>

        {/* Messages */}

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 mb-4">
            {success}
          </p>
        )}

        {/* Skills List */}

        <div>

          <h2 className="text-xl font-semibold mb-4">
            Your Skills
          </h2>

          {skills.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
              <p className="text-slate-400">
                No skills added yet.
              </p>
            </div>

          ) : (

            <div className="grid gap-4">

              {skills.map((skill) => (

                <div
                  key={skill.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                >

                  {editingId === skill.id ? (

                    /* Edit Form */

                    <form
                      onSubmit={handleUpdateSkill}
                      className="space-y-4"
                    >

                      {/* Edit Skill Name */}

                      <div>
                        <label className="block text-sm text-slate-300 mb-2">
                          Skill Name
                        </label>

                        <input
                          type="text"
                          value={editSkillName}
                          onChange={(e) =>
                            setEditSkillName(e.target.value)
                          }
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Edit Proficiency */}

                      <div>
                        <label className="block text-sm text-slate-300 mb-2">
                          Proficiency
                        </label>

                        <select
                          value={editProficiency}
                          onChange={(e) =>
                            setEditProficiency(e.target.value)
                          }
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
                        >
                          <option value="BEGINNER">
                            Beginner
                          </option>

                          <option value="INTERMEDIATE">
                            Intermediate
                          </option>

                          <option value="ADVANCED">
                            Advanced
                          </option>
                        </select>
                      </div>

                      {/* Edit Buttons */}

                      <div className="flex gap-3">

                        <button
                          type="submit"
                          disabled={updating}
                          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-5 py-2 rounded-lg font-semibold"
                        >
                          {updating
                            ? "Updating..."
                            : "Save"}
                        </button>

                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg font-semibold"
                        >
                          Cancel
                        </button>

                      </div>

                    </form>

                  ) : (

                    /* Normal Skill View */

                    <div className="flex items-center justify-between">

                      <div>
                        <h3 className="text-xl font-semibold">
                          {skill.skillName}
                        </h3>

                        <p className="text-slate-400 mt-1">
                          Proficiency: {skill.proficiency}
                        </p>
                      </div>

                      {/* Edit + Delete Buttons */}

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            handleEditClick(skill)
                          }
                          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteSkill(skill.id)
                          }
                          disabled={deleting}
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-5 py-2 rounded-lg font-semibold"
                        >
                          {deleting ? "Deleting..." : "Delete"}
                        </button>

                      </div>

                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>


      </div>
    </div>
  );
}

export default StudentSkills;

